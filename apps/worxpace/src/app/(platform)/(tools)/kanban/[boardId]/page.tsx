"use client";

import { redirect } from "next/navigation";

import { DocHeader, DocHeaderSkeleton } from "~/components";
import { useDocument, usePlatform } from "~/hooks";
import { type UpdateDocumentHandler } from "~/lib";
import Error from "../../error";
import KanbanBoard from "./_component/kanban-board";

interface Params {
  params: { boardId: string };
}

const KanbanPage = ({ params: { boardId } }: Params) => {
  const { accountId, workspaceId } = usePlatform();
  const {
    page: board,
    isLoading,
    error,
    update,
  } = useDocument({ documentId: boardId, preview: false });
  const onUpdate: UpdateDocumentHandler = async (data) => {
    await update({ accountId, workspaceId, ...data });
  };

  if (error) {
    switch (error.message) {
      case "Unauthorized":
        return redirect("/select-role");
      default:
        return <Error />;
    }
  }
  return (
    <div className="pb-40">
      {isLoading || !board ? (
        <DocHeaderSkeleton />
      ) : (
        <>
          <DocHeader document={board} onUpdate={onUpdate} />
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
