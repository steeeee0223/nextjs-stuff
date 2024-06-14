"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { ModalProvider } from "@/components/custom/modal-provider";
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
  onUploadFile?: (
    file: File,
    options?: {
      /** @params replaceTargetUrl: provide the URL to replaced with */
      replaceTargetUrl?: string;
    },
  ) => Promise<{ url: string }>;
}

export function SettingsProvider({
  settings,
  onUpdate,
  onUploadFile,
}: SettingsProviderProps) {
  const { theme, setTheme } = useTheme();
  const { update, user, account, workspace } = useSettingsStore();
  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: SettingsContextInterface = {
    settings: { user, account, workspace },
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
      <ModalProvider>
        <SettingsPanel />
      </ModalProvider>
    </SettingsContext.Provider>
  );
}
