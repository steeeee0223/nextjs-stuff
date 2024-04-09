"use client";

import { toast } from "sonner";
import useSWR, { type Fetcher } from "swr";
import useSWRMutation from "swr/mutation";

import type { Document } from "@acme/prisma";
import {
  KanbanProvider,
  type KanbanHandlers,
  type KanbanList,
} from "@acme/ui/custom";

import {
  copyCard,
  copyList,
  createCard,
  createList,
  deleteCard,
  deleteList,
  updateCardOrder as orderCards,
  updateListOrder as orderLists,
  updateCard,
  updateList,
} from "~/actions";
import { kanban } from "~/lib";
import { CardModal } from "./card-modal";

interface KanbanBoardProps {
  board: Document;
}

const KanbanBoard = ({ board: { id: boardId } }: KanbanBoardProps) => {
  const queryKey = `kanban:${boardId}`;
  const options = { onError: (e: Error) => toast.error(e.message) };
  /** Fetcher */
  const fetchLists: Fetcher<KanbanList[]> = async () => {
    try {
      const lists = await kanban.getLists(boardId);
      return lists.map(({ id, order, title, cards }) => ({
        id,
        order,
        title,
        items: cards.map(({ id, title, order, listId }) => ({
          id,
          title,
          order,
          listId,
        })),
      }));
    } catch {
      throw new Error("Error occurred while fetching kanban board");
    }
  };
  const { isLoading, data } = useSWR(queryKey, fetchLists, options);
  /** Kanban Actions */
  const { trigger: $addList } = useSWRMutation(queryKey, createList, options);
  const { trigger: $cpList } = useSWRMutation(queryKey, copyList, options);
  const { trigger: $updList } = useSWRMutation(queryKey, updateList, options);
  const { trigger: $ordList } = useSWRMutation(queryKey, orderLists, options);
  const { trigger: $delList } = useSWRMutation(queryKey, deleteList, options);
  const { trigger: $addCard } = useSWRMutation(queryKey, createCard, options);
  const { trigger: $cpCard } = useSWRMutation(queryKey, copyCard, options);
  const { trigger: $updCard } = useSWRMutation(queryKey, updateCard, options);
  const { trigger: $ordCard } = useSWRMutation(queryKey, orderCards, options);
  const { trigger: $delCard } = useSWRMutation(queryKey, deleteCard, options);
  const handlers: KanbanHandlers = {
    /** List */
    onCreateList: ({ id, title, order }) =>
      void $addList({ id, title, order, boardId }),
    onCopyList: (srcId, destId) => void $cpList({ srcId, destId, boardId }),
    onDeleteList: (id) => void $delList({ id, boardId }),
    onUpdateList: ({ id, title }) =>
      void $updList({ id, title, log: true, boardId }),
    onUpdateListOrder: (lists) => void $ordList({ lists, boardId }),
    /** Item */
    onCreateItem: (item) => void $addCard({ ...item, boardId }),
    onCopyItem: (src, dest) => void $cpCard({ src, dest, boardId }),
    onDeleteItem: ({ id }) => void $delCard({ id, boardId }),
    onUpdateItem: ({ id, title, listId }) =>
      void $updCard({ id, title, listId, boardId }),
    onUpdateItemOrder: (items) => void $ordCard({ boardId, items }),
  };

  return (
    <KanbanProvider
      className="w-[400px] pl-[54px] pt-8"
      isLoading={isLoading}
      initialLists={data}
      {...handlers}
    >
      <CardModal />
    </KanbanProvider>
  );
};

export default KanbanBoard;
