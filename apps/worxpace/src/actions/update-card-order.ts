"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { UpdateCardOrder, type UpdateCardOrderInput } from "@acme/validators";

import { createMutationFetcher, fetchClient, kanban, type Action } from "~/lib";

const handler: Action<UpdateCardOrderInput, Card[]> = async (_key, { arg }) => {
  fetchClient();
  const result = await kanban.updateCardsOrder(arg);
  revalidatePath(`/kanban/${arg.boardId}`);
  return result;
};

export const updateCardOrder = createMutationFetcher(UpdateCardOrder, handler);
