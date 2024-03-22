"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { UpdateCardOrder, type UpdateCardOrderInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateCardOrderInput, Card[]> = async (_key, { arg }) => {
  try {
    fetchClient();
    const result = await kanban.updateCardsOrder(arg);
    revalidatePath(`/kanban/${arg.boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to reorder cards.");
  }
};

export const updateCardOrder = createMutationFetcher(UpdateCardOrder, handler);
