"use server";

import { revalidatePath } from "next/cache";

import type { List } from "@acme/prisma";
import { CopyList, type CopyListInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  fetchClient,
  kanban,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CopyListInput, List> = async (_key, { arg }) => {
  const { boardId, srcId, destId } = arg;
  try {
    fetchClient();
    const srcList = await kanban.getListById({ boardId, id: srcId });
    if (!srcList) throw new Error("Not found");

    const numLists = await kanban.countLists(boardId);
    const cards =
      srcList.cards.length > 0
        ? srcList.cards.map(({ title, description, order }) => ({
            title,
            description,
            order,
          }))
        : undefined;
    const result = await kanban.createList(
      {
        id: destId,
        title: `${srcList.title} Copy`,
        order: numLists + 1,
        boardId,
      },
      cards,
    );
    /** Activity Log */
    await createAuditLog(
      { title: result.title, entityId: result.id, type: "LIST" },
      "CREATE",
    );
    revalidatePath(`/kanban/${boardId}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to copy list.");
  }
};

export const copyList = createMutationFetcher(CopyList, handler);
