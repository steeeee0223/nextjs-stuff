"use server";

import { worxpace as db, type Card, type List } from "@swy/prisma";
import type {
  CreateCardInput,
  CreateListInput,
  DeleteCardInput,
  DeleteListInput,
  UpdateCardInput,
  UpdateCardOrderInput,
  UpdateListInput,
  UpdateListOrderInput,
} from "@swy/validators";

type ListWithCards = List & { cards: Card[] };
type CardWithList = Card & { list: List };

export const countLists = async (boardId: string): Promise<number> =>
  await db.list.count({ where: { boardId } });

export const createCard = async ({
  accountId,
  ...data
}: Omit<CreateCardInput, "boardId">): Promise<Card> =>
  await db.card.create({
    data: { ...data, createdBy: accountId, updatedBy: accountId },
  });

export const createList = async (
  { accountId, ...data }: CreateListInput,
  cards?: Pick<CreateCardInput, "title" | "order" | "description">[],
): Promise<List> =>
  await db.list.create({
    data: {
      ...data,
      createdBy: accountId,
      updatedBy: accountId,
      ...(cards && {
        cards: {
          createMany: {
            data: cards.map((card) => ({
              ...card,
              createdBy: accountId,
              updatedBy: accountId,
            })),
          },
        },
      }),
    },
  });

export const deleteCard = async (
  data: Pick<DeleteCardInput, "id">,
): Promise<Card> => await db.card.delete({ where: data });

export const deleteList = async (
  data: Omit<DeleteListInput, "accountId">,
): Promise<List> => await db.list.delete({ where: data });

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
  accountId,
  id,
  listId,
  ...data
}: Omit<UpdateCardInput, "log" | "boardId">): Promise<Card> =>
  await db.card.update({
    where: { id, listId },
    data: { ...data, updatedBy: accountId },
  });

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
  accountId,
  id,
  boardId,
  ...data
}: Omit<UpdateListInput, "log">): Promise<List> =>
  await db.list.update({
    where: { id, boardId },
    data: { ...data, updatedBy: accountId },
  });

export const updateListsOrder = async ({
  lists,
  boardId,
}: UpdateListOrderInput): Promise<List[]> => {
  const transaction = lists.map(({ id, order }) =>
    db.list.update({ where: { id, boardId }, data: { order } }),
  );
  return await db.$transaction(transaction);
};
