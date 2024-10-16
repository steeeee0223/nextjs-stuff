"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@swy/prisma";
import { UpdateCardOrder, type UpdateCardOrderInput } from "@swy/validators";

import {
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateCardOrder,
  async (_key, { arg }) => {
    try {
      await fetchClient();
      return await kanban.updateCardsOrder(arg);
    } catch (error) {
      throw handleError(error, "Failed to reorder cards.");
    }
  },
);

export const updateCardOrder: MutationFetcher<
  Card[],
  KanbanKey,
  UpdateCardOrderInput
> = ({ boardId }, data) => handler(boardId, data);
