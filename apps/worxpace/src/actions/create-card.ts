"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@acme/prisma";
import { CreateCard, type CreateCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CreateCard, async (_key, { arg }) => {
  const { boardId, ...data } = arg;
  try {
    fetchClient();
    const result = await kanban.createCard(data);
    /** Activity Log */
    await auditLogs.create({
      entity: { title: arg.title, entityId: boardId, type: "ITEM" },
      action: "CREATE",
      accountId: data.accountId,
    });
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create card.");
  }
});

export const createCard: MutationFetcher<Card, KanbanKey, CreateCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
