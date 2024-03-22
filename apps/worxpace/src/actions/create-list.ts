"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { CreateList, type CreateListInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CreateListInput, List> = async (_key, { arg }) => {
  try {
    fetchClient();
    const result = await kanban.createList(arg);
    /** Activity Log */
    await createAuditLog(
      { title: arg.title, entityId: arg.id, type: "CARD" },
      "CREATE",
    );
    revalidatePath(`/kanban/${arg.boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create list.");
  }
};

export const createList = createMutationFetcher(CreateList, handler);
