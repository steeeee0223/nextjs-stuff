"use server";

import { currentUser } from "@clerk/nextjs/server";
import type { Fetcher } from "swr";

import * as account from "./account";
import * as documents from "./documents";
import { NotFound, UnauthorizedError } from "./errors";
import { fetchClient } from "./server";
import type { DocumentKey, WorkspaceKey } from "./swr";
import type { DetailedDocument } from "./types";

export const documentFetcher: Fetcher<DetailedDocument, DocumentKey> = async ({
  type,
  documentId,
  preview,
}) => {
  console.log(`[swr:${type}] fetching documents`);
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

export const fetchInitialWorkspace: Fetcher<
  { path: string; workspaceId?: string },
  WorkspaceKey
> = async ({ type, clerkId }) => {
  const user = await currentUser();
  if (clerkId === "" || !user || user.id !== clerkId)
    return { path: "/select-role" };

  console.log(`[swr:${type}] fetching workspaces for ${clerkId}`);
  const acc = await account.createIfNotExist({
    clerkId,
    name: user.fullName ?? "user",
    email: user.emailAddresses[0]?.emailAddress ?? "",
    avatarUrl: user.imageUrl,
  });

  const workspaceId = acc.memberships[0]?.workspaceId;
  console.log(`[swr:${type}] returning first workspace: ${workspaceId}`);
  return {
    path: workspaceId ? `/workspace/${workspaceId}` : "/onboarding",
    workspaceId,
  };
};
