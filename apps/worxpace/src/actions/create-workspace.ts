"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Workspace } from "@acme/prisma";
import { CreateWorkspace, type CreateWorkspaceInput } from "@acme/validators";

import { createMutationFetcher, UnauthorizedError, workspace } from "~/lib";

const handler = createMutationFetcher(
  CreateWorkspace,
  async (_key, { arg }) => {
    try {
      const result = await workspace.create(arg);
      revalidatePath(`/workspace/${result.id}`);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to create workspace.");
    }
  },
);

export const createWorkspace: MutationFetcher<
  Workspace,
  { type: "settings"; clerkId: string },
  CreateWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
