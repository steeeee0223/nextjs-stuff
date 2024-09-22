"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@acme/prisma";
import { UpdateListOrder, type UpdateListOrderInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateListOrder,
  async (boardId, { arg }) => {
    try {
      await fetchClient();
      return await kanban.updateListsOrder(arg);
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to reorder lists.");
    }
  },
);

export const updateListOrder: MutationFetcher<
  List[],
  KanbanKey,
  UpdateListOrderInput
> = ({ boardId }, data) => handler(boardId, data);
