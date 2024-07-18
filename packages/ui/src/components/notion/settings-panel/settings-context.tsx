"use client";

import { createContext, useContext } from "react";
import type { UseThemeProps } from "next-themes/dist/types";

import type { SettingsStore, UpdateSettings } from "./index.types";

export interface SettingsContextInterface
  extends Pick<UseThemeProps, "theme" | "setTheme"> {
  settings: SettingsStore;
  updateSettings: UpdateSettings;
  uploadFile?: (
    file: File,
    options?: { replaceTargetUrl?: string },
  ) => Promise<{ url: string }>;
  deleteAccount?: (data: { accountId: string; email: string }) => Promise<void>;
  deleteWorkspace?: (workspaceId: string) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextInterface | null>(
  null,
);

export function useSettings(): SettingsContextInterface {
  const object = useContext(SettingsContext);
  if (!object)
    throw new Error("useSettings must be used within SettingsProvider");
  return object;
}
