"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@acme/prisma";
import { DeleteCard, type DeleteCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(DeleteCard, async (boardId, { arg }) => {
  const { id, accountId } = arg;
  try {
    await fetchClient();
    const result = await kanban.deleteCard({ id });
    /** Activity Log */
    await auditLogs.create({
      entity: { title: result.title, entityId: boardId, type: "ITEM" },
      action: "DELETE",
      accountId,
    });
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete card.");
  }
});

export const deleteCard: MutationFetcher<Card, KanbanKey, DeleteCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
