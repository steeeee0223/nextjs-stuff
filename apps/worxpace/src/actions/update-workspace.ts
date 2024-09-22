"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@acme/prisma";
import { UpdateWorkspace, type UpdateWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
  workspace,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateWorkspace,
  async (workspaceId, { arg }) => {
    try {
      await fetchClient();
      return await workspace.update(workspaceId, arg);
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to update workspace.");
    }
  },
);

export const updateWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string; workspaceId: string },
  UpdateWorkspaceInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
