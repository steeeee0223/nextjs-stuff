"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

import { useSidebarLayout } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";
import {
  NavbarSkeleton,
  PageHeader,
  Sidebar,
  useSettingsStore,
  useWorkspace,
  type SidebarProps,
} from "@acme/ui/notion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@acme/ui/shadcn";

import { Room } from "~/components";
import {
  useDocuments,
  useEdgeStore,
  usePeopleSettings,
  usePlatform,
  useSettings,
  useSetup,
} from "~/hooks";
import { toIcon } from "~/lib";
import PageLayout from "./page-layout";

interface WorkspaceLayoutProps extends React.PropsWithChildren {
  pageId: string | null;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  pageId,
  children,
}) => {
  const router = useRouter();
  const { clerkId, accountId, workspaceId, ...platform } = usePlatform();
  const { activeWorkspace, select } = useWorkspace();
  /** Clerk */
  const { signOut } = useAuth();
  const { user } = useUser();
  /** Layout */
  const { minSize, ref, collapse, expand, isResizing, isMobile, isCollapsed } =
    useSidebarLayout("group", "sidebar", 240);
  /** Sidebar handlers */
  const { edgestore } = useEdgeStore();
  const store = useSettingsStore();
  const { isLoading, fetchPages, create, archive, restore, remove } =
    useDocuments({ workspaceId });
  const {
    settings,
    updateAccount,
    updateWorkspace,
    deleteAccount,
    deleteWorkspace,
  } = useSettings(activeWorkspace ? { clerkId, workspaceId } : null);
  const { fetchMemberships, addMembers, updateMember, deleteMember } =
    usePeopleSettings(activeWorkspace ? { clerkId, workspaceId } : null);
  const { fetchData } = useSetup({ clerkId });
  const sidebarProps: SidebarProps = {
    redirect: (path) => router.push(path),
    settingsProps: {
      settings,
      onUpdate: async ({ account, workspace }) => {
        account && (await updateAccount(account));
        if (workspace) {
          await updateWorkspace({
            ...workspace,
            icon: workspace.icon ? toIcon(workspace.icon) : undefined,
          });
          await fetchData();
        }
      },
      onUploadFile: async (file, options) => {
        const { url } = await edgestore.publicFiles.upload({ file, options });
        return { url };
      },
      onDeleteAccount: async ({ accountId }) => {
        await deleteAccount({ id: accountId, clerkId });
        select();
        await signOut(() => {
          platform.reset();
          store.reset();
          router.push("/sign-in");
        });
      },
      onDeleteWorkspace: async (id) => {
        await deleteWorkspace({ id });
        select();
        platform.update((prev) => ({ ...prev, workspaceId: "" }));
        store.reset();
        router.push("/select-role");
      },
      onConnectAccount: async (strategy) => {
        if (strategy === "slack") {
          const res = await user?.createExternalAccount({
            strategy: "oauth_slack",
            redirectUrl: `/workspace/${workspaceId}`,
          });
          console.log(res);
          const url = res?.verification?.externalVerificationRedirectURL;
          const status = res?.verification?.status;
          if (status !== "verified" && url) router.push(url.href);
        }
      },
      onFetchConnections: async () =>
        user?.externalAccounts
          .filter(({ provider }) => provider !== "google")
          .map(({ provider, identificationId, ...account }) => ({
            id: identificationId,
            connection: {
              type: provider,
              account:
                account.username ?? `${account.firstName} ${account.lastName}`,
            },
            scopes: ["Can preview links"],
            onDisconnect:
              provider === "github" || provider === "google"
                ? false
                : account.destroy,
          })) ?? [],
      onFetchMemberships: fetchMemberships,
      onAddMemberships: async (emails, role) =>
        void (await addMembers({ workspaceId, emails, role })),
      onUpdateMembership: async (userId, role) =>
        void (await updateMember({ accountId: userId, workspaceId, role })),
      onDeleteMembership: async (userId) => {
        await deleteMember({ accountId: userId, workspaceId });
        if (userId === accountId) router.push("/workspace");
      },
    },
    pageHandlers: {
      isLoading,
      fetchPages,
      onCreate: async (type, parentId) =>
        void create({
          type,
          parentId,
          title: "Untitled",
          accountId,
          workspaceId,
        }),
      onArchive: async (id) => void archive({ id, accountId, workspaceId }),
      onRestore: async (id) => void restore({ id, accountId, workspaceId }),
      onDelete: async (id) => void remove({ id, accountId, workspaceId }),
    },
    workspaceHandlers: {
      onSelect: async (id) => {
        // TODO fix this
        // await setActive?.({ organization: workspaceId });
        platform.update((prev) => ({ ...prev, workspaceId: id }));
        store.reset();
        router.push(`/workspace/${id}`);
      },
      onCreateWorkspace: () => router.push("/onboarding"),
      onLogout: () => {
        platform.reset();
        void signOut(() => router.push("/select-role"));
      },
    },
  };

  return (
    <ResizablePanelGroup
      id="group"
      direction="horizontal"
      className="h-screen w-screen"
    >
      <ResizablePanel
        id="sidebar"
        ref={ref}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
        defaultSize={isMobile ? 0 : undefined}
        minSize={isMobile ? 0 : minSize}
        maxSize={isMobile ? 100 : 50}
        collapsible
        order={1}
      >
        <Sidebar
          className="w-full"
          isMobile={isMobile}
          collapse={collapse}
          {...sidebarProps}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
      >
        <Room roomId={pageId} fallback={<Skeleton />}>
          <PageLayout
            pageId={pageId}
            isCollapsed={isCollapsed}
            onResetWidth={expand}
          >
            {children}
          </PageLayout>
        </Room>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default WorkspaceLayout;

const Skeleton = () => {
  return (
    <div className="absolute left-60 top-0 w-full">
      <div className="w-full bg-main" />
      <NavbarSkeleton />
      <main className="h-full flex-1 overflow-y-auto">
        <PageHeader.Skeleton />
      </main>
    </div>
  );
};
