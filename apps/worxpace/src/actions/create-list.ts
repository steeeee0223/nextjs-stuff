"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { List } from "@acme/prisma";
import { CreateList, type CreateListInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CreateList, async (boardId, { arg }) => {
  try {
    await fetchClient();
    const result = await kanban.createList(arg);
    /** Activity Log */
    await auditLogs.create({
      entity: { title: arg.title, entityId: boardId, type: "ITEM" },
      action: "CREATE",
      accountId: arg.accountId,
    });
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create list.");
  }
});

export const createList: MutationFetcher<List, KanbanKey, CreateListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
