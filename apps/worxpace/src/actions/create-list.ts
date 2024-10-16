"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@swy/prisma";
import { CreateList, type CreateListInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  handleError,
  kanban,
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
    return result;
  } catch (error) {
    throw handleError(error, "Failed to create list.");
  }
});

export const createList: MutationFetcher<List, KanbanKey, CreateListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
