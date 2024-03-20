"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { UpdateListOrder, type UpdateListOrderInput } from "@acme/validators";

import { createMutationFetcher, fetchClient, kanban, type Action } from "~/lib";

const handler: Action<UpdateListOrderInput, List[]> = async (_key, { arg }) => {
  fetchClient();
  const result = await kanban.updateListsOrder(arg);
  revalidatePath(`/kanban/${arg.boardId}`);
  return result;
};

export const updateListOrder = createMutationFetcher(UpdateListOrder, handler);
