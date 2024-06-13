"use server";

import type { MutationFetcher } from "swr/mutation";

import type { WorkspaceStore } from "@acme/ui/notion";
import {
  UpdateWorkspaceSettings,
  type UpdateWorkspaceSettingsInput,
} from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  settings,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateWorkspaceSettingsInput, WorkspaceStore> = async (
  workspaceId,
  { arg },
) => {
  try {
    fetchClient();
    return await settings.updateWorkspace(workspaceId, arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update settings.");
  }
};

const updateSettings = createMutationFetcher(UpdateWorkspaceSettings, handler);

export const updateWorkspaceSettings: MutationFetcher<
  WorkspaceStore,
  { type: "settings"; userId: string; workspaceId: string },
  UpdateWorkspaceSettingsInput
> = ({ workspaceId }, data) => updateSettings(workspaceId, data);
