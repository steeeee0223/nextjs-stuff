"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@swy/prisma";
import { UpdateList, type UpdateListInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(UpdateList, async (boardId, { arg }) => {
  const { log, ...data } = arg;
  try {
    await fetchClient();
    const result = await kanban.updateList(data);
    /** Activity Log */
    if (log)
      await auditLogs.create({
        entity: { type: "LIST", entityId: boardId, title: result.title },
        action: "UPDATE",
        accountId: data.accountId,
      });
    return result;
  } catch (error) {
    throw handleError(error, "Failed to update list.");
  }
});

export const updateList: MutationFetcher<List, KanbanKey, UpdateListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
