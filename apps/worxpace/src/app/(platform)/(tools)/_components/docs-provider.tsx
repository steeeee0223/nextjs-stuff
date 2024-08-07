"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams, usePathname } from "next/navigation";

import { TreeProvider } from "@acme/ui/custom";
import { useNavControl } from "@acme/ui/hooks";

import { DocHeaderSkeleton, Room } from "~/components";
import { GROUPS } from "~/constants/site";
import { usePlatform } from "~/hooks";
import Navbar, { NavbarSkeleton } from "./navbar";
import { Sidebar } from "./sidebar";

const DocsProvider = ({ children }: PropsWithChildren) => {
  const { accountId, workspaceId, toToolsPage } = usePlatform();
  const pathname = usePathname();
  const params = useParams<{
    documentId?: string;
    boardId?: string;
    whiteboardId?: string;
    workflowId?: string;
  }>();
  /** Sidebar & Navbar */
  const {
    isMobile,
    sidebarRef,
    navbarRef,
    isResetting,
    isCollapsed,
    handleMouseDown,
    collapse,
    resetWidth,
  } = useNavControl();

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isMobile]);
  /** Docs */
  const pageId =
    params.documentId ??
    params.boardId ??
    params.whiteboardId ??
    params.workflowId ??
    null;
  const isItemActive = (id: string) => pageId === id;

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      groups={GROUPS}
      onClickItem={toToolsPage}
      isItemActive={isItemActive}
    >
      <Sidebar
        ref={sidebarRef}
        isResetting={isResetting}
        isMobile={isMobile}
        handleMouseDown={handleMouseDown}
        resetWidth={resetWidth}
        collapse={collapse}
      />
      <Room roomId={pageId} fallback={<Skeleton />}>
        <Navbar
          accountId={accountId}
          workspaceId={workspaceId}
          pageId={pageId}
          ref={navbarRef}
          isCollapsed={isCollapsed}
          isResetting={isResetting}
          isMobile={isMobile}
          onResetWidth={resetWidth}
        />
        <main className="h-full flex-1 overflow-y-auto">{children}</main>
      </Room>
    </TreeProvider>
  );
};

export default DocsProvider;

const Skeleton = () => {
  return (
    <div className="absolute left-60 top-0 z-[99999] w-full">
      <div className="w-full bg-background dark:bg-[#1F1F1F]" />
      <NavbarSkeleton />
      <main className="h-full flex-1 overflow-y-auto">
        <DocHeaderSkeleton />
      </main>
    </div>
  );
};
