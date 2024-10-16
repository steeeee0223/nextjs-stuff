"use server";

import type { MutationFetcher } from "swr/mutation";

import type { List } from "@swy/prisma";
import { CopyList, type CopyListInput } from "@swy/validators";

import {
  auditLogs,
  createMutationFetcher,
  CustomError,
  fetchClient,
  handleError,
  kanban,
  type KanbanKey,
} from "~/lib";

const handler = createMutationFetcher(CopyList, async (_key, { arg }) => {
  const { boardId, srcId, destId, accountId } = arg;
  try {
    await fetchClient();
    const srcList = await kanban.getListById({ boardId, id: srcId });
    if (!srcList) throw new CustomError("NOT_FOUND", "db.kanban");

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
        accountId,
        id: destId,
        title: `${srcList.title} Copy`,
        order: numLists + 1,
        boardId,
      },
      cards,
    );
    /** Activity Log */
    await auditLogs.create({
      entity: { title: result.title, entityId: boardId, type: "LIST" },
      action: "CREATE",
      accountId,
    });
    return result;
  } catch (error) {
    throw handleError(error, "Failed to copy list.");
  }
});

export const copyList: MutationFetcher<List, KanbanKey, CopyListInput> = (
  { boardId },
  data,
) => handler(boardId, data);
