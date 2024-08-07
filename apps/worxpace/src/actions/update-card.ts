"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@acme/prisma";
import { UpdateCard, type UpdateCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(UpdateCard, async (_key, { arg }) => {
  const { boardId, ...data } = arg;
  try {
    await fetchClient();
    const result = await kanban.updateCard(data);
    /** Activity Log */
    await auditLogs.create({
      entity: { entityId: boardId, title: result.title, type: "ITEM" },
      action: "UPDATE",
      accountId: data.accountId,
    });
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update card.");
  }
});

export const updateCard: MutationFetcher<Card, KanbanKey, UpdateCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
