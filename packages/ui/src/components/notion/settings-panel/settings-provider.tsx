"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { I18nProvider } from "@acme/i18n";

import { ModalProvider } from "@/components/custom/modal-provider";
import { getScopes } from "../scopes";
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
  /** Connections */
  onFetchConnections?: SettingsContextInterface["connections"]["load"];
  onConnectAccount?: SettingsContextInterface["connections"]["add"];
  /** People */
  onFetchMemberships?: SettingsContextInterface["people"]["load"];
  onAddMemberships?: SettingsContextInterface["people"]["add"];
  onUpdateMembership?: SettingsContextInterface["people"]["update"];
  onDeleteMembership?: SettingsContextInterface["people"]["delete"];
}

export function SettingsProvider({
  settings,
  onUpdate,
  onUploadFile,
  onDeleteAccount,
  onDeleteWorkspace,
  onFetchConnections,
  onConnectAccount,
  onFetchMemberships,
  onAddMemberships,
  onUpdateMembership,
  onDeleteMembership,
}: SettingsProviderProps) {
  const { theme, setTheme } = useTheme();
  const { update, account, workspace } = useSettingsStore();

  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: SettingsContextInterface = {
    settings: { account, workspace },
    scopes: getScopes(workspace.plan, workspace.role),
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
    people: {
      load: onFetchMemberships,
      add: onAddMemberships,
      update: onUpdateMembership,
      delete: onDeleteMembership,
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
