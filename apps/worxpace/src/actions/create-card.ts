"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { CreateCard, type CreateCardInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CreateCardInput, Card> = async (_key, { arg }) => {
  const { boardId, ...info } = arg;
  try {
    fetchClient();
    const result = await kanban.createCard(info);
    /** Activity Log */
    await auditLogs.create(
      { title: arg.title, entityId: boardId, type: "ITEM" },
      "CREATE",
    );
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create card.");
  }
};

export const createCard = createMutationFetcher(CreateCard, handler);
