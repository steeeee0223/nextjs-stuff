"use client";

import type { Document } from "@acme/prisma";
import { KanbanList, KanbanProvider } from "@acme/ui/components";

import { CardModal } from "./card-modal";
import { defaultHandlers } from "./handlers";

interface KanbanBoardProps {
  board: Document;
}

const KanbanBoard = ({ board }: KanbanBoardProps) => {
  console.log(board);
  return (
    <KanbanProvider
      className="w-[400px] pl-[54px] pt-8"
      fetchLists={async () => ({ data: [] as KanbanList[] })}
      {...defaultHandlers}
    >
      <CardModal />
    </KanbanProvider>
  );
};

export default KanbanBoard;
