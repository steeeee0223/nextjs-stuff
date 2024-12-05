"use server";

import { worxpace as db } from "@swy/prisma";
import type { Document } from "@swy/prisma";
import type { Modified } from "@swy/ui/lib";
import type {
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@swy/validators";

type Action = "ARCHIVE" | "RESTORE";
const UPDATE: Record<Action, Partial<Document>> = {
  ARCHIVE: { isArchived: true },
  RESTORE: { isArchived: false },
};

export const create = async ({
  accountId,
  ...data
}: CreateDocumentInput & Pick<Document, "icon">): Promise<Document> =>
  await db.document.create({
    data: {
      ...data,
      isArchived: false,
      isPublished: false,
      createdId: accountId,
      updatedId: accountId,
    },
  });

export const getById = async (documentId: string): Promise<Document | null> =>
  await db.document.findUnique({ where: { id: documentId } });

export const getByWorkspace = async (where: {
  workspaceId: string;
  isArchived?: boolean;
}): Promise<Document[]> =>
  await db.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

const updateChildrenState = async (
  action: Action,
  where: Pick<Document, "workspaceId" | "parentId">,
  onSuccess?: (childrenIds: string[]) => void,
): Promise<void> => {
  await db.document.updateMany({ where, data: UPDATE[action] });
  const children = await db.document.findMany({ where });
  onSuccess?.(children.map(({ id }) => id));
  for (const { id } of children)
    await updateChildrenState(action, { ...where, parentId: id }, onSuccess);
};

export const archive = async ({
  accountId,
  workspaceId,
  id,
}: DeleteDocumentInput): Promise<Modified<Document>> => {
  const modifiedIds = [id];
  const item = await db.document.update({
    where: { id },
    data: { ...UPDATE.ARCHIVE, updatedId: accountId },
  });
  await updateChildrenState("ARCHIVE", { workspaceId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  return { item, ids: modifiedIds };
};

export const restore = async ({
  accountId,
  workspaceId,
  id,
}: DeleteDocumentInput): Promise<Modified<Document>> => {
  let item;
  const modifiedIds = [id];
  /** Restore `id`
   * if it has a parent, set parent to `undefined`
   */
  item = await db.document.findUnique({
    where: { id },
    include: { parent: true },
  });
  if (!item) throw new Error("Document not found");
  item = await db.document.update({
    where: { id },
    data: item.parent?.isArchived
      ? { parentId: null, isArchived: false, updatedId: accountId }
      : { ...UPDATE.RESTORE, updatedId: accountId },
  });
  /** Restore all its children */
  await updateChildrenState("RESTORE", { workspaceId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  return { item, ids: modifiedIds };
};

export const update = async ({
  accountId,
  workspaceId,
  id,
  ...updateData
}: Omit<UpdateDocumentInput, "log">): Promise<Document> =>
  await db.document.update({
    where: { workspaceId, id },
    data: { ...updateData, updatedId: accountId },
  });

const removeChildren = async (
  where: Pick<Document, "workspaceId" | "parentId">,
  onSuccess?: (childrenIds: string[]) => void,
) => {
  const children = await db.document.findMany({ where });
  /** Delete children */
  const childrenIds = [];
  for (const { id } of children) {
    await removeChildren({ ...where, parentId: id }, onSuccess);
    childrenIds.push(id);
  }
  onSuccess?.(childrenIds);
  /** Delete parent */
  await db.document.deleteMany({ where });
};

export const remove = async ({
  workspaceId,
  id,
}: DeleteDocumentInput): Promise<Modified<Document>> => {
  const modifiedIds = [id];
  /** Delete all its children */
  await removeChildren({ workspaceId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  /** Delete the document */
  const item = await db.document.delete({ where: { workspaceId, id } });
  return { item, ids: modifiedIds };
};
