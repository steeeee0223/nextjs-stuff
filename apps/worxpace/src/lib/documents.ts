"use server";

import { worxpace as db, type Document } from "@acme/prisma";
import { CreateDocumentInput } from "@acme/validators";

export const createDocument = async (
  data: CreateDocumentInput & { userId: string; orgId: string | null },
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
