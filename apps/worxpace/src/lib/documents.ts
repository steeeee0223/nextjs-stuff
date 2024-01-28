"use server";

import { worxpace as db, type Document } from "@acme/prisma";
import type { Modified } from "@acme/ui/lib";
import type {
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@acme/validators";

interface User {
  userId: string;
  orgId: string | null;
}
type Action = "ARCHIVE" | "RESTORE";
const UPDATE: Record<Action, Partial<Document>> = {
  ARCHIVE: { isArchived: true },
  RESTORE: { isArchived: false },
};

export const createDocument = async (
  data: CreateDocumentInput & User,
): Promise<Document> =>
  await db.document.create({
    data: { ...data, isArchived: false, isPublished: false },
  });

export const fetchDocuments = async (
  userId: string,
  orgId: string | null,
  isArchived?: boolean,
  parentId?: string | null,
): Promise<Document[]> =>
  await db.document.findMany({
    where: { userId, orgId, parentId, isArchived },
    orderBy: { createdAt: "desc" },
  });

export const updateChildrenState = async (
  action: Action,
  data: Pick<Document, "parentId"> & User,
  onSuccess?: (childrenIds: string[]) => void,
): Promise<void> => {
  await db.document.updateMany({ where: data, data: UPDATE[action] });
  const children = await db.document.findMany({ where: data });
  onSuccess?.(children.map(({ id }) => id));
  for (const { id } of children)
    await updateChildrenState(action, { ...data, parentId: id }, onSuccess);
};

export const archive = async ({
  userId,
  orgId,
  id,
}: DeleteDocumentInput & User): Promise<Modified<Document>> => {
  const modifiedIds = [id];
  const item = await db.document.update({
    where: { userId, orgId, id },
    data: UPDATE.ARCHIVE,
  });
  await updateChildrenState("ARCHIVE", { userId, orgId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  return { item, ids: modifiedIds };
};

export const restore = async ({
  userId,
  orgId,
  id,
}: DeleteDocumentInput & User): Promise<Modified<Document>> => {
  let item;
  const modifiedIds = [id];
  /** Restore `id`
   * if it has a parent, set parent to `undefined`
   */
  item = await db.document.findUnique({
    where: { userId, orgId, id },
    include: { parent: true },
  });
  if (!item) throw new Error("Document not found");
  item = await db.document.update({
    where: { userId, orgId, id },
    data: item.parent?.isArchived
      ? {
          parentId: null,
          isArchived: false,
        }
      : UPDATE.RESTORE,
  });
  /** Restore all its children */
  await updateChildrenState("RESTORE", { userId, orgId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  return { item, ids: modifiedIds };
};

export const renameDocument = async ({
  userId,
  orgId,
  id,
  title,
}: UpdateDocumentInput & User): Promise<Document> =>
  await db.document.update({ where: { userId, orgId, id }, data: { title } });

export const removeChildren = async (
  data: Pick<Document, "parentId"> & User,
  onSuccess?: (childrenIds: string[]) => void,
) => {
  const children = await db.document.findMany({ where: data });
  /** Delete children */
  const childrenIds = [];
  for (const { id } of children) {
    await removeChildren({ ...data, parentId: id }, onSuccess);
    childrenIds.push(id);
  }
  onSuccess?.(childrenIds);
  /** Delete parent */
  await db.document.deleteMany({ where: data });
};

export const remove = async ({
  userId,
  orgId,
  id,
}: DeleteDocumentInput & User): Promise<Modified<Document>> => {
  const modifiedIds = [id];
  /** Delete all its children */
  await removeChildren({ userId, orgId, parentId: id }, (ids) =>
    modifiedIds.push(...ids),
  );
  /** Delete the document */
  const item = await db.document.delete({ where: { userId, orgId, id } });
  return { item, ids: modifiedIds };
};