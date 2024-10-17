"use server";

import { currentUser } from "@clerk/nextjs/server";
import type { Fetcher } from "swr";

import type { Workspace } from "@swy/prisma";

import * as account from "./account";
import * as documents from "./documents";
import { NotFound, UnauthorizedError } from "./errors";
import { fetchClient } from "./server";
import type { DocumentKey, InvitationKey, WorkspaceKey } from "./swr";
import type { DetailedDocument } from "./types";
import { emailToUsername } from "./utils";
import * as workspace from "./workspace";

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

type InvitationData = {
  workspace: Workspace;
  isSignedIn: boolean;
  accountId?: string;
  isInWorkspace?: boolean;
} | null;

export const invitationFetcher: Fetcher<
  InvitationData,
  InvitationKey
> = async ({ token, clerkId }) => {
  // Find the target workspace
  const ws = await workspace.byInviteToken(token);
  if (!ws) return null;
  // Verify user status
  const user = await currentUser();
  if (!user || !clerkId || clerkId === "" || clerkId !== user.id)
    return { workspace: ws, isSignedIn: false };
  // Get user accoont
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const acc = await account.createIfNotExist({
    clerkId,
    name: emailToUsername(email),
    email,
    avatarUrl: user.imageUrl,
  });
  // Check if user is already in workspace
  const isInWorkspace = await account.isInWorkspace({
    clerkId,
    workspaceId: ws.id,
  });
  return {
    workspace: ws,
    accountId: acc.id,
    isSignedIn: true,
    isInWorkspace,
  };
};
