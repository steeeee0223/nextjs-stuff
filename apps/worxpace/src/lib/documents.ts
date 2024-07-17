"use server";

import { worxpace as db } from "@acme/prisma";
import type { Document } from "@acme/prisma";
import type { Modified } from "@acme/ui/lib";
import type {
  CreateDocumentInput,
  DeleteDocumentInput,
  UpdateDocumentInput,
} from "@acme/validators";

import type { DetailedDocument } from "./types";

type Action = "ARCHIVE" | "RESTORE";
const UPDATE: Record<Action, Partial<Document>> = {
  ARCHIVE: { isArchived: true },
  RESTORE: { isArchived: false },
};
const include = { workspace: true, createdBy: true, updatedBy: true };

export const create = async ({
  accountId,
  ...data
}: CreateDocumentInput & Pick<Document, "icon">): Promise<DetailedDocument> =>
  await db.document.create({
    data: {
      ...data,
      isArchived: false,
      isPublished: false,
      createdId: accountId,
      updatedId: accountId,
    },
    include,
  });

export const getById = async (
  documentId: string,
): Promise<DetailedDocument | null> =>
  await db.document.findUnique({ where: { id: documentId }, include });

export const getByWorkspace = async (where: {
  workspaceId: string;
  isArchived?: boolean;
}): Promise<DetailedDocument[]> =>
  await db.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include,
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
}: DeleteDocumentInput): Promise<Modified<DetailedDocument>> => {
  const modifiedIds = [id];
  const item = await db.document.update({
    where: { id },
    data: { ...UPDATE.ARCHIVE, updatedId: accountId },
    include,
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
}: DeleteDocumentInput): Promise<Modified<DetailedDocument>> => {
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
    include,
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
}: Omit<UpdateDocumentInput, "log">): Promise<DetailedDocument> =>
  await db.document.update({
    where: { workspaceId, id },
    data: { ...updateData, updatedId: accountId },
    include,
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
