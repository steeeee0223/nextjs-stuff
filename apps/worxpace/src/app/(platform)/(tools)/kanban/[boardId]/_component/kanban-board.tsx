"use client";

import type { Document } from "@swy/prisma";
import { KanbanProvider, type KanbanHandlers } from "@swy/ui/custom";

import { useKanban } from "~/hooks";
import { CardModal } from "./card-modal";

interface KanbanBoardProps {
  accountId: string;
  workspaceId: string;
  board: Document;
}

const KanbanBoard = ({
  board: { id: boardId },
  accountId,
}: KanbanBoardProps) => {
  const { kanban, isLoading, ...actions } = useKanban({ boardId });
  const handlers: KanbanHandlers = {
    /** List */
    onCreateList: ({ id, title, order }) =>
      void actions.addList({ id, title, order, boardId, accountId }),
    onCopyList: (srcId, destId) =>
      void actions.copyList({ srcId, destId, boardId, accountId }),
    onDeleteList: (id) => void actions.deleteList({ id, boardId, accountId }),
    onUpdateList: ({ id, title }) =>
      void actions.updateList({ id, title, log: true, boardId, accountId }),
    onUpdateListOrder: (lists) => void actions.reorderList({ lists, boardId }),
    /** Item */
    onCreateItem: (item) =>
      void actions.addCard({ ...item, boardId, accountId }),
    onCopyItem: (src, dest) =>
      void actions.copyCard({ src, dest, boardId, accountId }),
    onDeleteItem: ({ id }) =>
      void actions.deleteCard({ id, boardId, accountId }),
    onUpdateItem: ({ id, title, listId }) =>
      void actions.updateCard({ id, title, listId, boardId, accountId }),
    onUpdateItemOrder: (items) => void actions.reorderCard({ boardId, items }),
  };

  return (
    <KanbanProvider
      className="w-[400px] pl-[54px] pt-8"
      isLoading={isLoading}
      initialLists={kanban}
      {...handlers}
    >
      <CardModal />
    </KanbanProvider>
  );
};

export default KanbanBoard;
