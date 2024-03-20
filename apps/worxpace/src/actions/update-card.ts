"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { UpdateCard, type UpdateCardInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  type Action,
} from "~/lib";

const handler: Action<UpdateCardInput, Card> = async (_key, { arg }) => {
  const { boardId, ...data } = arg;
  fetchClient();
  const result = await kanban.updateCard(data);
  /** Activity Log */
  await createAuditLog(
    { entityId: result.id, title: result.title, type: "CARD" },
    "UPDATE",
  );
  revalidatePath(`/kanban/${boardId}`);
  return result;
};

export const updateCard = createMutationFetcher(UpdateCard, handler);
