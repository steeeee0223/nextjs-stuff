"use client";

import React, { forwardRef } from "react";

import {
  Navbar,
  NavbarSkeleton,
  PageProvider,
  type NavbarProps,
  type PageProviderProps,
} from "@swy/notion";

import {
  useDocument,
  useDocuments,
  useEdgeStore,
  useHistory,
  useOthers,
  usePlatform,
  useSelf,
} from "~/hooks";
import { toIcon, toIconInfo, toPage } from "~/lib";

interface PageLayoutProps
  extends React.PropsWithChildren,
    Omit<NavbarProps, "className"> {
  pageId: string | null;
  onChangeState: (id: string, action: "archive" | "restore" | "delete") => void;
}

const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children, pageId, onChangeState, ...navProps }, ref) => {
    const { accountId, workspaceId } = usePlatform();
    const currentUser = useSelf();
    const otherUsers = useOthers();
    const { fetchPages } = useDocuments({ workspaceId });
    const {
      page: doc,
      isLoading,
      update,
    } = useDocument(pageId ? { documentId: pageId, preview: false } : null);
    const { fetchLogs } = useHistory(pageId);
    /** Edgestore */
    const { deleteFile } = useEdgeStore();
    /** Page */
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const onUpdate: PageProviderProps["onUpdate"] = async (
      id,
      { icon, coverImage, ...data },
    ) => {
      // if icon is updated
      if (icon !== undefined) await deleteFile(toIconInfo(doc?.icon));
      // if coverImage is updated
      if (coverImage !== undefined) await deleteFile(doc?.coverImage);
      await update({
        id,
        accountId,
        workspaceId,
        icon: !icon ? icon : toIcon(icon),
        coverImage,
        ...data,
        log: true,
      });
      if (icon !== undefined) await fetchPages();
    };

    return (
      <PageProvider
        className="order-3 flex size-full flex-col overflow-hidden"
        isLoading={isLoading}
        page={toPage(doc)}
        currentUser={currentUser}
        otherUsers={otherUsers}
        fetchLogs={fetchLogs}
        onChangeState={onChangeState}
        onUpdate={onUpdate}
      >
        {isLoading ? (
          <NavbarSkeleton />
        ) : (
          <Navbar ref={ref} className="w-full" {...navProps} />
        )}
        {/* relative top-12 z-10 flex w-full flex-shrink flex-grow-0 flex-col bg-main transition-transform */}
        <main className="h-full flex-1 overflow-y-auto">{children}</main>
      </PageProvider>
    );
  },
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
