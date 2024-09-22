"use client";

import React, { forwardRef } from "react";

import {
  Navbar,
  NavbarSkeleton,
  PageProvider,
  type NavbarProps,
  type PageProviderProps,
} from "@acme/ui/notion";

import {
  useDocument,
  useDocuments,
  useEdgeStore,
  useHistory,
  usePlatform,
} from "~/hooks";
import { toIcon, toIconInfo, toPage } from "~/lib";

// import { useOthers, useSelf } from "~/liveblocks.config";

interface PageLayoutProps
  extends React.PropsWithChildren,
    Omit<NavbarProps, "className"> {
  pageId: string | null;
}

const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children, pageId, ...navProps }, ref) => {
    const { accountId, workspaceId } = usePlatform();
    /** @warning add these will crash!!! */
    // const currentUser = useSelf();
    // const otherUsers = useOthers();
    const {
      page: doc,
      isLoading,
      update,
    } = useDocument(pageId ? { documentId: pageId, preview: false } : null);
    const { archive, restore, remove } = useDocuments({ workspaceId });
    const { fetchLogs } = useHistory(pageId);
    /** Edgestore */
    const { deleteFile } = useEdgeStore();
    /** Page */
    const pageProps: PageProviderProps = {
      isLoading,
      page: toPage(doc),
      // currentUser: toUser(currentUser),
      // otherUsers: otherUsers.map(toUser),
      fetchLogs,
      onChangeState: (id, action) => {
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
      },
      onUpdate: (id, { icon, coverImage, ...data }) => {
        // if icon is updated
        if (icon !== undefined) void deleteFile(toIconInfo(doc?.icon));
        // if coverImage is updated
        if (coverImage !== undefined) void deleteFile(doc?.coverImage);
        void update?.({
          id,
          accountId,
          workspaceId,
          icon: !icon ? icon : toIcon(icon),
          coverImage,
          ...data,
          log: true,
        });
      },
    };

    return (
      <PageProvider
        className="order-3 flex size-full flex-col overflow-hidden"
        {...pageProps}
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
