"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { DeleteList, type DeleteListInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<DeleteListInput, List> = async (_key, { arg }) => {
  try {
    fetchClient();
    const result = await kanban.deleteList(arg);
    /** Activity Log */
    await createAuditLog(
      { title: result.title, entityId: result.id, type: "LIST" },
      "DELETE",
    );
    revalidatePath(`/kanban/${arg.boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete list.");
  }
};

export const deleteList = createMutationFetcher(DeleteList, handler);
