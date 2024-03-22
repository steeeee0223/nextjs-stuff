"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { UpdateListOrder, type UpdateListOrderInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateListOrderInput, List[]> = async (_key, { arg }) => {
  try {
    fetchClient();
    const result = await kanban.updateListsOrder(arg);
    revalidatePath(`/kanban/${arg.boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to reorder lists.");
  }
};

export const updateListOrder = createMutationFetcher(UpdateListOrder, handler);
