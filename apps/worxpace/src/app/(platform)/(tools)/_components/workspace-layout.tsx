"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

import { RoomProvider } from "@swy/liveblocks";
import { useSidebarLayout } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  NavbarSkeleton,
  PageHeader,
  Sidebar,
  useSettingsStore,
  useWorkspace,
  type SidebarProps,
} from "@swy/ui/notion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@swy/ui/shadcn";

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
    resetLink,
  } = useSettings(activeWorkspace ? { clerkId, workspaceId } : null);
  const { fetchMemberships, addMembers, updateMember, deleteMember } =
    usePeopleSettings(activeWorkspace ? { clerkId, workspaceId } : null);
  const { fetchData } = useSetup({ clerkId });
  const sidebarProps: SidebarProps = {
    redirect: (path) => router.push(path),
    settingsProps: {
      settings,
      onUpdate: ({ account, workspace }) => {
        if (account) void updateAccount(account);
        if (workspace) {
          void updateWorkspace({
            ...workspace,
            icon: workspace.icon ? toIcon(workspace.icon) : undefined,
          }).then(() => fetchData());
        }
      },
      onUploadFile: async (file, options) => {
        const { url } = await edgestore.publicFiles.upload({ file, options });
        return { url };
      },
      onDeleteAccount: ({ accountId }) =>
        void deleteAccount({ id: accountId, clerkId }).then(async () => {
          select();
          await signOut(() => {
            platform.reset();
            store.reset();
            router.push("/select-role");
          });
        }),
      onDeleteWorkspace: (id) => {
        void deleteWorkspace({ id });
        select();
        platform.update((prev) => ({ ...prev, workspaceId: "" }));
        store.reset();
        router.push("/select-role");
      },
      onResetLink: () => void resetLink(),
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
      onFetchConnections: () =>
        Promise.resolve(
          user?.externalAccounts
            .filter(({ provider }) => provider !== "google")
            .map(({ provider, identificationId, ...account }) => ({
              id: identificationId,
              connection: {
                type: provider,
                account:
                  account.username ??
                  `${account.firstName} ${account.lastName}`,
              },
              scopes: ["Can preview links"],
              onDisconnect:
                provider === "github" || provider === "google"
                  ? false
                  : account.destroy,
            })) ?? [],
        ),
      onFetchMemberships: fetchMemberships,
      onAddMemberships: (emails, role) =>
        void addMembers({
          workspaceId,
          emails,
          role,
          inviteLink: settings.workspace.inviteLink,
        }),
      onUpdateMembership: (userId, role) =>
        void updateMember({ accountId: userId, workspaceId, role }),
      onDeleteMembership: (userId) => {
        void deleteMember({ accountId: userId, workspaceId });
        if (userId === accountId) router.push("/workspace");
      },
    },
    pageHandlers: {
      isLoading,
      fetchPages,
      onCreate: (type, parentId) =>
        void create({
          type,
          parentId,
          title: "Untitled",
          accountId,
          workspaceId,
        }),
      onArchive: (id) => void archive({ id, accountId, workspaceId }),
      onRestore: (id) => void restore({ id, accountId, workspaceId }),
      onDelete: (id) => void remove({ id, accountId, workspaceId }),
    },
    workspaceHandlers: {
      onSelect: (id) => {
        // TODO fix this
        // await setActive?.({ organization: workspaceId });
        platform.update((prev) => ({ ...prev, workspaceId: id }));
        store.reset();
        router.push(`/workspace/${id}`);
      },
      onCreateWorkspace: () => router.push("/onboarding"),
      onLogout: () => {
        platform.reset();
        store.reset();
        void signOut(() => router.push("/select-role"));
      },
    },
  };
  /** Page handlers */
  const onChangeState = (
    id: string,
    action: "archive" | "restore" | "delete",
  ) => {
    switch (action) {
      case "archive":
        void archive({ id, accountId, workspaceId });
        break;
      case "restore":
        void restore({ id, accountId, workspaceId });
        break;
      case "delete":
        void remove({ id, accountId, workspaceId });
        break;
    }
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
        <RoomProvider
          authEndpoint="/api/liveblocks"
          roomId={pageId ?? `w_${workspaceId}`}
          fallback={<Skeleton />}
        >
          <PageLayout
            pageId={pageId}
            isCollapsed={isCollapsed}
            onResetWidth={expand}
            onChangeState={onChangeState}
          >
            {children}
          </PageLayout>
        </RoomProvider>
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
