"use server";

import { revalidatePath } from "next/cache";

import type { Card } from "@acme/prisma";
import { DeleteCard, type DeleteCardInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  type Action,
} from "~/lib";

const handler: Action<DeleteCardInput, Card> = async (_key, { arg }) => {
  const { id, boardId } = arg;
  fetchClient();
  const result = await kanban.deleteCard({ id });
  /** Activity Log */
  await createAuditLog(
    { title: result.title, entityId: result.id, type: "CARD" },
    "DELETE",
  );
  revalidatePath(`/kanban/${boardId}`);
  return result;
};

export const deleteCard = createMutationFetcher(DeleteCard, handler);
