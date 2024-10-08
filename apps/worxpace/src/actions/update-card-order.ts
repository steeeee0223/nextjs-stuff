"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@swy/prisma";
import { UpdateCardOrder, type UpdateCardOrderInput } from "@swy/validators";

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
      return await kanban.updateCardsOrder(arg);
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
