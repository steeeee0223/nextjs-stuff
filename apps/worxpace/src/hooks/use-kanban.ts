"use client";

import { toast } from "sonner";
import useSWR, { type Fetcher } from "swr";
import useSWRMutation from "swr/mutation";

import { KanbanList } from "@swy/ui/custom";

import {
  copyCard as _copyCard,
  copyList as _copyList,
  createCard as _createCard,
  createList as _createList,
  deleteCard as _deleteCard,
  deleteList as _deleteList,
  updateCard as _updateCard,
  updateCardOrder as _updateCardOrder,
  updateList as _updateList,
  updateListOrder as _updateListOrder,
} from "~/actions";
import { kanban, type KanbanKey } from "~/lib";

/** Fetcher */
const fetchLists: Fetcher<KanbanList[], KanbanKey> = async ({ boardId }) => {
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

export const useKanban = ({ boardId }: Omit<KanbanKey, "type">) => {
  const key: KanbanKey = { type: "kanban", boardId };
  const options = { onError: (e: Error) => toast.error(e.message) };
  const { isLoading, data } = useSWR(key, fetchLists, options);
  /** Kanban Actions */
  const { trigger: addList } = useSWRMutation(key, _createList, options);
  const { trigger: copyList } = useSWRMutation(key, _copyList, options);
  const { trigger: updateList } = useSWRMutation(key, _updateList, options);
  const { trigger: reorderList } = useSWRMutation(
    key,
    _updateListOrder,
    options,
  );
  const { trigger: deleteList } = useSWRMutation(key, _deleteList, options);
  const { trigger: addCard } = useSWRMutation(key, _createCard, options);
  const { trigger: copyCard } = useSWRMutation(key, _copyCard, options);
  const { trigger: updateCard } = useSWRMutation(key, _updateCard, options);
  const { trigger: reorderCard } = useSWRMutation(
    key,
    _updateCardOrder,
    options,
  );
  const { trigger: deleteCard } = useSWRMutation(key, _deleteCard, options);

  return {
    isLoading,
    kanban: data,
    addList,
    copyList,
    updateList,
    reorderList,
    deleteList,
    addCard,
    copyCard,
    updateCard,
    reorderCard,
    deleteCard,
  };
};
