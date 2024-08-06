"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@acme/prisma";
import { DeleteList, type DeleteListInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(DeleteList, async (boardId, { arg }) => {
  const { accountId, ...data } = arg;
  try {
    await fetchClient();
    const result = await kanban.deleteList(data);
    /** Activity Log */
    await auditLogs.create({
      entity: { title: result.title, entityId: boardId, type: "LIST" },
      action: "DELETE",
      accountId,
    });
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete list.");
  }
});

export const deleteList: MutationFetcher<List, KanbanKey, DeleteListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
