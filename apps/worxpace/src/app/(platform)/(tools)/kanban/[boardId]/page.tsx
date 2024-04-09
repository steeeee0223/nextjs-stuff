"use client";

import { redirect } from "next/navigation";

import { DocHeader, DocHeaderSkeleton } from "~/components";
import { usePage } from "~/hooks";
import Error from "../../error";
import KanbanBoard from "./_component/kanban-board";

interface Params {
  params: { boardId: string };
}

const KanbanPage = ({ params: { boardId } }: Params) => {
  const { page: board, isLoading, error } = usePage(boardId, false);

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
          <DocHeader document={board} />
          <KanbanBoard board={board} />
        </>
      )}
    </div>
  );
};

export default KanbanPage;
