"use client";

import { SidebarProps, usePlatformStore, useSettingsStore } from "@swy/notion";

import { useMockDB } from "./use-mock-db";

export const useSidebarData = (): Pick<
  SidebarProps,
  "settingsProps" | "pageHandlers"
> => {
  /** DB */
  const { deleteFromDB } = useMockDB();
  /** Store */
  const settings = useSettingsStore((state) => ({
    account: state.account,
    workspace: state.workspace,
  }));
  const updateSettings = useSettingsStore((state) => state.update);
  const resetSettings = useSettingsStore((state) => state.reset);
  const deleteWorkspace = usePlatformStore((state) => state.deleteWorkspace);

  return {
    settingsProps: {
      settings,
      onUpdate: updateSettings,
      onDeleteWorkspace: (id) =>
        void deleteFromDB("workspaces", (w) => w.id === id).then((ok) => {
          if (ok) {
            deleteWorkspace(id);
            resetSettings();
          }
        }),
    },
    pageHandlers: {},
  };
};
