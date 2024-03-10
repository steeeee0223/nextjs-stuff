"use server";

import type { Fetcher } from "swr";

import type { Document } from "@acme/prisma";

import { documents, fetchClient } from "~/lib";

export const getDocument: Fetcher<Document, [string, boolean]> = async ([
  documentId,
  preview,
]) => {
  const document = await documents.getById(documentId);
  if (!document) throw new Error("Not found");
  // Published & not archived
  if (document.isPublished && !document.isArchived) return document;
  // Preview, but either archived or not published
  if (preview) throw new Error("Not found");
  // Verify user if not preview
  const { userId, orgId } = fetchClient();
  if (document.userId !== userId || document.orgId !== orgId)
    throw new Error("Unauthorized");
  // Return authorized doc
  return document;
};
