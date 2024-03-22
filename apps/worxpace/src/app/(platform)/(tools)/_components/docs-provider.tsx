"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

import { Document } from "@acme/prisma";
import { TreeItem, TreeProvider } from "@acme/ui/components";
import { useNavControl } from "@acme/ui/hooks";

import { DocHeaderSkeleton, Room } from "~/components";
import { useClient } from "~/hooks";
import { fetchUrl } from "~/lib";
import Navbar from "./navbar";
import SearchCommand from "./search-command";
import { Sidebar } from "./sidebar";

const DocsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { workspaceId } = useClient();
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
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);
  /** Docs */
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
  const fetchItems = async (): Promise<TreeItem[]> => {
    try {
      const documents: Document[] = await fetchUrl(`/api/documents/`);
      return documents.map((doc) => ({
        ...doc,
        group: doc.isArchived ? `trash:${doc.type}` : doc.type,
      }));
    } catch {
      throw new Error("Error occurred while fetching documents");
    }
  };
  const { data, isLoading } = useSWR(`doc:${workspaceId}`, fetchItems);

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      isLoading={isLoading}
      initialItems={data}
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
      <RoomWrapper>
        <Navbar
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
      </RoomWrapper>
    </TreeProvider>
  );
};

export default DocsProvider;

const RoomWrapper = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const roomId =
    (params.documentId as string) ??
    (params.boardId as string) ??
    (params.whiteboardId as string) ??
    null;
  if (!roomId) return <>{children}</>;
  return (
    <Room roomId={roomId} fallback={<Skeleton />}>
      {children}
    </Room>
  );
};

const Skeleton = () => {
  return (
    <div className="absolute left-60 top-0 z-[99999] w-full">
      <div className="w-full bg-background dark:bg-[#1F1F1F]" />
      <main className="h-full flex-1 overflow-y-auto">
        <DocHeaderSkeleton />
      </main>
    </div>
  );
};
