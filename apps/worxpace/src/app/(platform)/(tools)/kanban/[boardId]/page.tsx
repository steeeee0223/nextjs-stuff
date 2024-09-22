"use client";

import { redirect } from "next/navigation";

import { PageHeader } from "@acme/ui/notion";

import { useDocument, useEdgeStore, usePlatform } from "~/hooks";
import Error from "../../error";
import KanbanBoard from "./_component/kanban-board";

interface Params {
  params: { boardId: string };
}

const KanbanPage = ({ params: { boardId } }: Params) => {
  const { accountId, workspaceId } = usePlatform();
  const { uploadFile } = useEdgeStore();
  const {
    page: board,
    isLoading,
    error,
  } = useDocument({ documentId: boardId, preview: false });

  if (error) {
    switch (error.message) {
      case "Unauthorized":
        return redirect("/select-role");
      default:
        return <Error error={error} />;
    }
  }
  return (
    <div className="pb-40">
      {isLoading || !board ? (
        <PageHeader.Skeleton />
      ) : (
        <>
          <PageHeader
            unsplashAPIKey={process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}
            onUpload={uploadFile}
          />
          <KanbanBoard
            accountId={accountId}
            workspaceId={workspaceId}
            board={board}
          />
        </>
      )}
    </div>
  );
};

export default KanbanPage;
