"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@acme/prisma";
import { CopyCard, type CopyCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CopyCard, async (_key, { arg }) => {
  const { src, dest, boardId, accountId } = arg;
  try {
    await fetchClient();
    const srcCard = await kanban.getCard(src.id);
    if (!srcCard) throw new Error("Not found");

    const result = await kanban.createCard({
      accountId,
      ...dest,
      description: srcCard.description,
    });
    /** Activity Log */
    await auditLogs.create({
      entity: { entityId: boardId, title: dest.title, type: "ITEM" },
      action: "CREATE",
      accountId,
    });
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to copy card.");
  }
});

export const copyCard: MutationFetcher<Card, KanbanKey, CopyCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
