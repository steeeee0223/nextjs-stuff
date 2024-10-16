"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@swy/prisma";
import { CreateCard, type CreateCardInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CreateCard, async (_key, { arg }) => {
  const { boardId, ...data } = arg;
  try {
    await fetchClient();
    const result = await kanban.createCard(data);
    /** Activity Log */
    await auditLogs.create({
      entity: { title: arg.title, entityId: boardId, type: "ITEM" },
      action: "CREATE",
      accountId: data.accountId,
    });
    return result;
  } catch (error) {
    throw handleError(error, "Failed to create card.");
  }
});

export const createCard: MutationFetcher<Card, KanbanKey, CreateCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
