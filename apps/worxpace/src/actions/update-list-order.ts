"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@swy/prisma";
import { UpdateListOrder, type UpdateListOrderInput } from "@swy/validators";

import {
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateListOrder,
  async (boardId, { arg }) => {
    try {
      await fetchClient();
      return await kanban.updateListsOrder(arg);
    } catch (error) {
      throw handleError(error, "Failed to reorder lists.");
    }
  },
);

export const updateListOrder: MutationFetcher<
  List[],
  KanbanKey,
  UpdateListOrderInput
> = ({ boardId }, data) => handler(boardId, data);
