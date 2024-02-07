"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Document } from "@acme/prisma";
import { TreeProvider } from "@acme/ui/components";
import { useNavControl } from "@acme/ui/hooks";

import { Room } from "~/components";
import { fetchUrl } from "~/lib";
import Navbar from "./navbar";
import SearchCommand from "./search-command";
import { Sidebar } from "./sidebar";

const DocsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
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
  const onClickItem = (id: string) => router.push(`/documents/${id}`);
  const isItemActive = (id: string) => params.documentId === id;
  const fetchItems = async () => {
    try {
      const data: Document[] = await fetchUrl(`/api/documents/`);
      return { data };
    } catch {
      return { error: `Error occurred while fetching documents` };
    }
  };

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      fetchItems={fetchItems}
      onClickItem={onClickItem}
      isItemActive={isItemActive}
    >
      <RoomWrapper documentId={params.documentId as string | undefined}>
        <Sidebar
          ref={sidebarRef}
          isResetting={isResetting}
          isMobile={isMobile}
          handleMouseDown={handleMouseDown}
          resetWidth={resetWidth}
          collapse={collapse}
        />
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

const RoomWrapper = ({
  children,
  documentId,
}: PropsWithChildren<{ documentId?: string | null }>) => {
  if (!documentId) return <>{children}</>;
  return (
    <Room roomId={documentId} fallback={null}>
      {children}
    </Room>
  );
};
