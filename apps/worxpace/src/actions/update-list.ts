"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { UpdateList, type UpdateListInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateListInput, List> = async (_key, { arg }) => {
  const { log, ...updateData } = arg;
  try {
    fetchClient();
    const result = await kanban.updateList(updateData);
    /** Activity Log */
    if (log)
      await auditLogs.create(
        { type: "LIST", entityId: arg.boardId, title: result.title },
        "UPDATE",
      );
    revalidatePath(`/kanban/${arg.boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update list.");
  }
};

export const updateList = createMutationFetcher(UpdateList, handler);
