"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";

import { EdgeStoreProvider } from "~/hooks";
import WorkspaceLayout from "./_components/workspace-layout";

const ToolsLayout = ({ children }: React.PropsWithChildren) => {
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

  return (
    <EdgeStoreProvider>
      <div className="flex h-screen bg-main">
        <WorkspaceLayout pageId={pageId}>{children}</WorkspaceLayout>
      </div>
    </EdgeStoreProvider>
  );
};

export default ToolsLayout;
