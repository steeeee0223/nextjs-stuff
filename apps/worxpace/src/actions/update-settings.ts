"use server";

import type { SettingsStore } from "@acme/ui/notion";
import { UpdateSettings, type UpdateSettingsInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  settings,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateSettingsInput, SettingsStore> = async (
  _key,
  { arg },
) => {
  try {
    fetchClient();
    return await settings.update(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update settings.");
  }
};

export const updateSettings = createMutationFetcher(UpdateSettings, handler);
