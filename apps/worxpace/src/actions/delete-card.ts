"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { DeleteCard, type DeleteCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<DeleteCardInput, Card> = async (_key, { arg }) => {
  const { id, boardId } = arg;
  try {
    fetchClient();
    const result = await kanban.deleteCard({ id });
    /** Activity Log */
    await auditLogs.create(
      { title: result.title, entityId: boardId, type: "ITEM" },
      "DELETE",
    );
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete card.");
  }
};

export const deleteCard = createMutationFetcher(DeleteCard, handler);
