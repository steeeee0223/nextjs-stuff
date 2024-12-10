"use client";

import { SidebarProps, usePlatformStore, useSettingsStore } from "@swy/notion";

export const useSidebarData = (): Pick<
  SidebarProps,
  "settingsProps" | "pageHandlers"
> => {
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
      onDeleteWorkspace: (id) => {
        deleteWorkspace(id);
        resetSettings();
      },
    },
    pageHandlers: {},
  };
};
