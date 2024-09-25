import type { MutationFetcher } from "swr/mutation";

import type { Account, Document, Workspace } from "@swy/prisma";
import type { UpdateDocumentInput } from "@swy/validators";

export interface Client {
  type: "admin" | "personal" | "organization";
  userId: string;
  orgId: string | null;
  clerkId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export type Action<Input, Output> = MutationFetcher<Output, string, Input>;

export type PageType = "document" | "whiteboard" | "kanban" | "workflow";

export interface WorkflowContent {
  type: "workflow";
  name: string;
  description: string;
  isPublished: boolean;
}

export type DetailedDocument = Document & {
  workspace: Workspace;
  createdBy: Account;
  updatedBy: Account;
};

export type UpdateDocumentHandler = (
  data: Omit<UpdateDocumentInput, "accountId" | "workspaceId">,
) => Promise<void>;
