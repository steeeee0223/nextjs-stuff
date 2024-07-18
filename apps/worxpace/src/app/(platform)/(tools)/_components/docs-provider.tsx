"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { TreeProvider } from "@acme/ui/custom";
import { useNavControl } from "@acme/ui/hooks";

import { DocHeaderSkeleton, Room } from "~/components";
import Navbar, { NavbarSkeleton } from "./navbar";
import SearchCommand from "./search-command";
import { Sidebar } from "./sidebar";

const DocsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{
    documentId?: string;
    boardId?: string;
    whiteboardId?: string;
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
    params.documentId ?? params.boardId ?? params.whiteboardId ?? null;
  const groups = [
    "document",
    "kanban",
    "whiteboard",
    "trash:document",
    "trash:kanban",
    "trash:whiteboard",
  ];
  const onClickItem = (id: string, group: string | null) => {
    if (group === "document") router.push(`/documents/${id}`);
    if (group === "kanban") router.push(`/kanban/${id}`);
    if (group === "whiteboard") router.push(`/whiteboard/${id}`);
  };
  const isItemActive = (id: string, group: string | null) => {
    if (group === "document") return params.documentId === id;
    if (group === "kanban") return params.boardId === id;
    if (group === "whiteboard") return params.whiteboardId === id;
    return false;
  };

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      groups={groups}
      onClickItem={onClickItem}
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
          pageId={pageId}
          ref={navbarRef}
          isCollapsed={isCollapsed}
          isResetting={isResetting}
          isMobile={isMobile}
          onResetWidth={resetWidth}
        />
        <main className="h-full flex-1 overflow-y-auto">
          <SearchCommand />
          {children}
        </main>
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
