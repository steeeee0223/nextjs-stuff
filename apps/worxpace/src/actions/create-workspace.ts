"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@swy/prisma";
import { CreateWorkspace, type CreateWorkspaceInput } from "@swy/validators";

import { createMutationFetcher, handleError, workspace } from "~/lib";

const handler = createMutationFetcher(
  CreateWorkspace,
  async (_key, { arg }) => {
    try {
      return await workspace.create(arg);
    } catch (error) {
      throw handleError(error, "Failed to create workspace.");
    }
  },
);

export const createWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string },
  CreateWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
