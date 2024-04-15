"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { UpdateCard, type UpdateCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateCardInput, Card> = async (_key, { arg }) => {
  const { boardId, ...data } = arg;
  try {
    fetchClient();
    const result = await kanban.updateCard(data);
    /** Activity Log */
    await auditLogs.create(
      { entityId: boardId, title: result.title, type: "ITEM" },
      "UPDATE",
    );
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update card.");
  }
};

export const updateCard = createMutationFetcher(UpdateCard, handler);
