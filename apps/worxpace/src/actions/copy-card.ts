"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Card } from "@swy/prisma";
import { CopyCard, type CopyCardInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  CustomError,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CopyCard, async (_key, { arg }) => {
  const { src, dest, boardId, accountId } = arg;
  try {
    await fetchClient();
    const srcCard = await kanban.getCard(src.id);
    if (!srcCard) throw new CustomError("NOT_FOUND", "db.kanban");

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
    return result;
  } catch (error) {
    throw handleError(error, "Failed to copy card.");
  }
});

export const copyCard: MutationFetcher<Card, KanbanKey, CopyCardInput> = (
  { boardId },
  data,
) => handler(boardId, data);
