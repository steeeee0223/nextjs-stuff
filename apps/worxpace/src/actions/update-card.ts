"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@swy/prisma";
import { UpdateCard, type UpdateCardInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
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
    return result;
  } catch (error) {
    throw handleError(error, "Failed to update card.");
  }
});

export const updateCard: MutationFetcher<Card, KanbanKey, UpdateCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
