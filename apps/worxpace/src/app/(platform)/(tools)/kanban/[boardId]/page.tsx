"use client";

import { redirect } from "next/navigation";
import useSWR from "swr";

import type { Document } from "@acme/prisma";

import { getDocument } from "~/app/(platform)/_functions";
import { DocHeader, DocHeaderSkeleton } from "~/components";
import Error from "../../error";
import KanbanBoard from "./_component/kanban-board";

interface Params {
  params: { boardId: string };
}

const KanbanPage = ({ params: { boardId } }: Params) => {
  const {
    data: board,
    isLoading,
    error,
  } = useSWR<Document, Error>([boardId, false], getDocument, {
    onError: (e, key) => console.log(`[swr] ${key}: ${e.message}`),
  });

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
