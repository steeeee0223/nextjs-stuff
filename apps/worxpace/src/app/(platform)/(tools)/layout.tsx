"use client";

import { type PropsWithChildren } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { TreeProvider } from "@swy/ui/custom";

import { GROUPS } from "~/constants/site";
import { usePlatform } from "~/hooks";
import WorkspaceLayout from "./_components/workspace-layout";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  const { isSignedIn } = useAuth();
  const { toToolsPage } = usePlatform();
  /** Routing */
  const router = useRouter();
  const params = useParams<{
    documentId?: string;
    boardId?: string;
    whiteboardId?: string;
    workflowId?: string;
  }>();
  const pageId =
    params.documentId ??
    params.boardId ??
    params.whiteboardId ??
    params.workflowId ??
    null;
  const isItemActive = (id: string) => {
    return pageId === id;
  };

  if (!isSignedIn) router.push("/select-role");
  return (
    <TreeProvider
      className="flex h-screen bg-main"
      groups={GROUPS}
      onClickItem={toToolsPage}
      isItemActive={isItemActive}
    >
      <WorkspaceLayout pageId={pageId}>{children}</WorkspaceLayout>
    </TreeProvider>
  );
};

export default ToolsLayout;
