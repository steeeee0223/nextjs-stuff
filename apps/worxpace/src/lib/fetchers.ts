"use server";

import type { Fetcher } from "swr";

import * as account from "./account";
import * as documents from "./documents";
import { NotFound, UnauthorizedError } from "./errors";
import { fetchClient } from "./server";
import type { DocumentKey } from "./swr";
import type { DetailedDocument } from "./types";

export const documentFetcher: Fetcher<DetailedDocument, DocumentKey> = async ({
  documentId,
  preview,
}) => {
  console.log(`[swr] [${documentId}:${preview}]: start fetching`);
  const document = await documents.getById(documentId);
  if (!document) throw new NotFound();
  // Published & not archived
  if (document.isPublished && !document.isArchived) return document;
  // Public, but either archived or not published
  if (preview) throw new NotFound();
  // Verify user if not preview
  const { clerkId } = await fetchClient();
  const inWorkspace = await account.isInWorkspace({
    clerkId,
    workspaceId: document.workspaceId,
  });
  if (!inWorkspace) throw new UnauthorizedError();
  // Return authorized document
  return document;
};
