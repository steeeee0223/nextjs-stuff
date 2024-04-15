"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { CopyCard, type CopyCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CopyCardInput, Card> = async (_key, { arg }) => {
  const { src, dest, boardId } = arg;
  try {
    fetchClient();
    const srcCard = await kanban.getCard(src.id);
    if (!srcCard) throw new Error("Not found");

    const result = await kanban.createCard({
      ...dest,
      description: srcCard.description,
    });
    /** Activity Log */
    await auditLogs.create(
      { entityId: boardId, title: dest.title, type: "ITEM" },
      "CREATE",
    );
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to copy card.");
  }
};

export const copyCard = createMutationFetcher(CopyCard, handler);
