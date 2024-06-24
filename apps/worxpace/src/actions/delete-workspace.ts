"use server";

import type { Workspace } from "@acme/prisma";
import { DeleteWorkspace, type DeleteWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
  workspace,
  type Action,
} from "~/lib";

const handler: Action<DeleteWorkspaceInput, Workspace> = async (
  _key,
  { arg },
) => {
  try {
    fetchClient();
    return await workspace.delete(arg.id);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete workspace.");
  }
};

export const deleteWorkspace = createMutationFetcher(DeleteWorkspace, handler);
