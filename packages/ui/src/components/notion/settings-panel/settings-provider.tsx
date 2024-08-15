"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { I18nProvider } from "@acme/i18n";

import { ModalProvider } from "@/components/custom/modal-provider";
import type { Connection } from "../tables";
import type {
  ConnectionStrategy,
  SettingsStore,
  UpdateSettings,
} from "./index.types";
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
  /** Connections */
  onFetchConnections?: () => Promise<Connection[]>;
  onConnectAccount?: (strategy: ConnectionStrategy) => Promise<void>;
}

export function SettingsProvider({
  settings,
  onUpdate,
  onUploadFile,
  onDeleteAccount,
  onDeleteWorkspace,
  onFetchConnections,
  onConnectAccount,
}: SettingsProviderProps) {
  const { theme, setTheme } = useTheme();
  const { update, account, workspace } = useSettingsStore();

  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: SettingsContextInterface = {
    settings: { account, workspace },
    updateSettings: async (data) => {
      update(data);
      await onUpdate?.(data);
    },
    uploadFile: onUploadFile,
    deleteAccount: onDeleteAccount,
    deleteWorkspace: onDeleteWorkspace,
    connections: {
      load: onFetchConnections,
      add: onConnectAccount,
    },
    theme,
    setTheme,
  };

  return (
    <I18nProvider language={account.language} defaultNS="settings">
      <SettingsContext.Provider value={context}>
        <ModalProvider>
          <SettingsPanel />
        </ModalProvider>
      </SettingsContext.Provider>
    </I18nProvider>
  );
}
