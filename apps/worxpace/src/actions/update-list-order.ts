"use server";

import { revalidatePath } from "next/cache";
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
      fetchClient();
      const result = await kanban.updateListsOrder(arg);
      revalidatePath(`/kanban/${boardId}`);
      return result;
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
