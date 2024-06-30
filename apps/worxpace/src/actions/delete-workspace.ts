"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@acme/prisma";
import { DeleteWorkspace, type DeleteWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
  workspace,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteWorkspace,
  async (_key, { arg }) => {
    try {
      fetchClient();
      return await workspace.delete(arg.id);
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to delete workspace.");
    }
  },
);

export const deleteWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string },
  DeleteWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
