import type { MutationFetcher } from "swr/mutation";

export interface Client {
  role: "admin" | "personal" | "organization";
  userId: string;
  orgId: string | null;
  path: string;
  username: string;
  workspace: string;
  workspaceId: string;
}

export type Action<Input, Output> = MutationFetcher<Output, string, Input>;

export type PageType = "document" | "whiteboard" | "kanban" | "workflow";

export interface WorkflowContent {
  type: "workflow";
  name: string;
  description: string;
  isPublished: boolean;
}
