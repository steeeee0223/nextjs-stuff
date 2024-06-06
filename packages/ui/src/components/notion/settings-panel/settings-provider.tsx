"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import type { SettingsStore, UpdateSettings } from "./index.types";
import {
  SettingsContext,
  type SettingsContextInterface,
} from "./settings-context";
import { SettingsPanel } from "./settings-panel";
import { useSettingsStore } from "./use-settings";

export interface SettingsProviderProps {
  settings: SettingsStore;
  onUpdate?: UpdateSettings;
  onUploadFile?: (file: File) => Promise<{ url: string }>;
}

export function SettingsProvider({
  settings,
  onUpdate,
  onUploadFile,
}: SettingsProviderProps) {
  const { theme, setTheme } = useTheme();
  const { update, user, account } = useSettingsStore();
  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: SettingsContextInterface = {
    settings: { user, account },
    updateSettings: async (data) => {
      update(data);
      await onUpdate?.(data);
    },
    uploadFile: onUploadFile,
    theme,
    setTheme,
  };

  return (
    <SettingsContext.Provider value={context}>
      <SettingsPanel />
    </SettingsContext.Provider>
  );
}
