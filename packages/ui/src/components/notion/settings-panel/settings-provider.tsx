"use client";

import { useEffect, useMemo } from "react";
import { useTheme } from "next-themes";

import { I18nProvider } from "@acme/i18n";

import { ModalProvider } from "@/components/custom/modal-provider";
import { getScopes } from "../scopes";
import type { UploadFile } from "../types";
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
  onUploadFile?: UploadFile;
  onDeleteAccount?: SettingsContextInterface["deleteAccount"];
  onDeleteWorkspace?: SettingsContextInterface["deleteWorkspace"];
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
  const { update, account, workspace, tab, setTab } = useSettingsStore();

  useEffect(() => {
    update(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const context: SettingsContextInterface = useMemo(
    () => ({
      settings: { account, workspace },
      scopes: getScopes(workspace.plan, workspace.role),
      tab,
      setTab,
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, theme, workspace, tab],
  );

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
