"use server";

import type { MutationFetcher } from "swr/mutation";

import type { WorkspaceStore } from "@acme/ui/notion";
import { UpdateWorkspace, type UpdateWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  toIconInfo,
  UnauthorizedError,
  workspace,
  type Action,
} from "~/lib";

const handler: Action<UpdateWorkspaceInput, WorkspaceStore> = async (
  workspaceId,
  { arg },
) => {
  try {
    fetchClient();
    const { id, name, icon, domain } = await workspace.update(workspaceId, arg);
    return { id, name, icon: toIconInfo(icon), domain };
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update workspace.");
  }
};

const update = createMutationFetcher(UpdateWorkspace, handler);

export const updateWorkspace: MutationFetcher<
  WorkspaceStore,
  { type: "settings"; userId: string; workspaceId: string },
  UpdateWorkspaceInput
> = ({ workspaceId }, data) => update(workspaceId, data);
