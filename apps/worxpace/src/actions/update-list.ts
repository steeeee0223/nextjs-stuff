"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { List } from "@acme/prisma";
import { UpdateList, type UpdateListInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(UpdateList, async (boardId, { arg }) => {
  const { log, ...data } = arg;
  try {
    fetchClient();
    const result = await kanban.updateList(data);
    /** Activity Log */
    if (log)
      await auditLogs.create({
        entity: { type: "LIST", entityId: boardId, title: result.title },
        action: "UPDATE",
        accountId: data.accountId,
      });
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update list.");
  }
});

export const updateList: MutationFetcher<List, KanbanKey, UpdateListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
