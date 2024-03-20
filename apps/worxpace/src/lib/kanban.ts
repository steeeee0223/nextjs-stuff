"use server";

import { worxpace as db, type Card, type List } from "@acme/prisma";
import type {
  CreateCardInput,
  CreateListInput,
  DeleteCardInput,
  DeleteListInput,
  UpdateCardInput,
  UpdateCardOrderInput,
  UpdateListInput,
  UpdateListOrderInput,
} from "@acme/validators";

type ListWithCards = List & { cards: Card[] };
type CardWithList = Card & { list: List };

export const countLists = async (boardId: string): Promise<number> =>
  await db.list.count({ where: { boardId } });

export const createCard = async (
  data: Omit<CreateCardInput, "boardId">,
): Promise<Card> => await db.card.create({ data });

export const createList = async (
  data: CreateListInput,
  cards?: Pick<CreateCardInput, "title" | "order" | "description">[],
): Promise<List> =>
  await db.list.create({
    data: { ...data, ...(cards && { cards: { createMany: { data: cards } } }) },
  });

export const deleteCard = async (
  data: Omit<DeleteCardInput, "boardId">,
): Promise<Card> => await db.card.delete({ where: data });

export const deleteList = async (data: DeleteListInput): Promise<List> =>
  await db.list.delete({ where: data });

export const getCard = async (id: string): Promise<CardWithList | null> =>
  await db.card.findUnique({ where: { id }, include: { list: true } });

export const getListById = async (
  data: Pick<List, "id" | "boardId">,
): Promise<ListWithCards | null> =>
  db.list.findUnique({ where: data, include: { cards: true } });

export const getLists = async (boardId: string): Promise<ListWithCards[]> =>
  await db.list.findMany({
    where: { boardId },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

export const updateCard = async ({
  id,
  listId,
  ...updateData
}: Omit<UpdateCardInput, "log" | "boardId">): Promise<Card> =>
  await db.card.update({ where: { id, listId }, data: updateData });

export const updateCardsOrder = async ({
  items,
  boardId,
}: UpdateCardOrderInput): Promise<Card[]> => {
  const transaction = items.map(({ id, order, listId }) =>
    db.card.update({
      where: { id, list: { boardId } },
      data: { order, listId },
    }),
  );
  return await db.$transaction(transaction);
};

export const updateList = async ({
  id,
  boardId,
  ...updateData
}: Omit<UpdateListInput, "log">): Promise<List> =>
  await db.list.update({ where: { id, boardId }, data: updateData });

export const updateListsOrder = async ({
  lists,
  boardId,
}: UpdateListOrderInput): Promise<List[]> => {
  const transaction = lists.map(({ id, order }) =>
    db.list.update({ where: { id, boardId }, data: { order } }),
  );
  return await db.$transaction(transaction);
};
