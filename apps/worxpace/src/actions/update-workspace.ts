"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@swy/prisma";
import { UpdateWorkspace, type UpdateWorkspaceInput } from "@swy/validators";

import {
  createMutationFetcher,
  fetchClient,
  handleError,
  workspace,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateWorkspace,
  async (workspaceId, { arg }) => {
    try {
      await fetchClient();
      return await workspace.update(workspaceId, arg);
    } catch (error) {
      throw handleError(error, "Failed to update workspace.");
    }
  },
);

export const updateWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string; workspaceId: string },
  UpdateWorkspaceInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
