"use server";

import type { MutationFetcher } from "swr/mutation";

import type { AccountStore } from "@acme/ui/notion";
import {
  UpdateAccountSettings,
  type UpdateAccountSettingsInput,
} from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  settings,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateAccountSettingsInput, AccountStore> = async (
  userId,
  { arg },
) => {
  try {
    fetchClient();
    return await settings.updateAccount(userId, arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update settings.");
  }
};

const updateSettings = createMutationFetcher(UpdateAccountSettings, handler);

export const updateAccountSettings: MutationFetcher<
  AccountStore,
  { type: "settings"; userId: string; workspaceId: string },
  UpdateAccountSettingsInput
> = ({ userId }, data) => updateSettings(userId, data);
