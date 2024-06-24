"use server";

import type { Workspace } from "@acme/prisma";
import { CreateWorkspace, type CreateWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  UnauthorizedError,
  workspace,
  type Action,
} from "~/lib";

const handler: Action<CreateWorkspaceInput, Workspace> = async (
  _key,
  { arg },
) => {
  try {
    return await workspace.create(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create workspace.");
  }
};

export const createWorkspace = createMutationFetcher(CreateWorkspace, handler);
