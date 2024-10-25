"use client";

import { useCallback, useMemo, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import { TreeProvider } from "@swy/ui/shared";

import { GROUPS } from "~/constants/site";
import { EdgeStoreProvider, useDocuments, usePlatform } from "~/hooks";
import { toTreeItem } from "~/lib";
import WorkspaceLayout from "./_components/workspace-layout";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  const { toToolsPage, workspaceId } = usePlatform();
  /** Routing */
  const params = useParams<{
    documentId?: string;
    boardId?: string;
    whiteboardId?: string;
    workflowId?: string;
  }>();
  const pageId = useMemo(
    () =>
      params.documentId ??
      params.boardId ??
      params.whiteboardId ??
      params.workflowId ??
      null,
    [params],
  );
  const isItemActive = useCallback((id: string) => pageId === id, [pageId]);
  const { documents } = useDocuments({ workspaceId });
  const pages = useMemo(() => documents?.map(toTreeItem) ?? [], [documents]);

  return (
    <EdgeStoreProvider>
      <TreeProvider
        className="flex h-screen bg-main"
        groups={GROUPS}
        initialItems={pages}
        onClickItem={toToolsPage}
        isItemActive={isItemActive}
      >
        <WorkspaceLayout pageId={pageId}>{children}</WorkspaceLayout>
      </TreeProvider>
    </EdgeStoreProvider>
  );
};

export default ToolsLayout;
