"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { UpdateList, type UpdateListInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  type Action,
} from "~/lib";

const handler: Action<UpdateListInput, List> = async (_key, { arg }) => {
  const { log, ...updateData } = arg;
  fetchClient();
  const result = await kanban.updateList(updateData);
  /** Activity Log */
  if (log)
    await createAuditLog(
      { type: "DOCUMENT", entityId: result.id, title: result.title },
      "UPDATE",
    );
  revalidatePath(`/kanban/${arg.boardId}`);
  return result;
};

export const updateList = createMutationFetcher(UpdateList, handler);
