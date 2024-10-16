"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@swy/prisma";
import { DeleteWorkspace, type DeleteWorkspaceInput } from "@swy/validators";

import {
  createMutationFetcher,
  fetchClient,
  handleError,
  workspace,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteWorkspace,
  async (_key, { arg }) => {
    try {
      await fetchClient();
      return await workspace.delete(arg.id);
    } catch (error) {
      throw handleError(error, "Failed to delete workspace.");
    }
  },
);

export const deleteWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string },
  DeleteWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
