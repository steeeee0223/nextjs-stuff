"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { I18nProvider, useTranslation } from "@acme/i18n";

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
  onDeleteAccount?: (data: {
    accountId: string;
    email: string;
  }) => Promise<void>;
  onDeleteWorkspace?: (workspaceId: string) => Promise<void>;
}

export function SettingsProvider({
  settings,
  onUpdate,
  onUploadFile,
  onDeleteAccount,
  onDeleteWorkspace,
}: SettingsProviderProps) {
  const { theme, setTheme } = useTheme();
  const { update, account, workspace } = useSettingsStore();
  const { i18n } = useTranslation();
  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void i18n.changeLanguage(account.language);
  }, [i18n, account.language]);

  const context: SettingsContextInterface = {
    settings: { account, workspace },
    updateSettings: async (data) => {
      update(data);
      await onUpdate?.(data);
    },
    uploadFile: onUploadFile,
    deleteAccount: onDeleteAccount,
    deleteWorkspace: onDeleteWorkspace,
    theme,
    setTheme,
  };

  return (
    <I18nProvider defaultNS="settings">
      <SettingsContext.Provider value={context}>
        <ModalProvider>
          <SettingsPanel />
        </ModalProvider>
      </SettingsContext.Provider>
    </I18nProvider>
  );
}
