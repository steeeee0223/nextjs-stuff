"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@acme/prisma";
import { UpdateCardOrder, type UpdateCardOrderInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateCardOrder,
  async (_key, { arg }) => {
    try {
      await fetchClient();
      const result = await kanban.updateCardsOrder(arg);
      revalidatePath(`/kanban/${arg.boardId}`);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to reorder cards.");
    }
  },
);

export const updateCardOrder: MutationFetcher<
  Card[],
  KanbanKey,
  UpdateCardOrderInput
> = ({ boardId }, data) => handler(boardId, data);
