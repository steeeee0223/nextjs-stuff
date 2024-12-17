"use client";

import {
  usePlatformStore,
  useSettingsStore,
  type SidebarProps,
} from "@swy/notion";

import { useMockDB } from "./use-mock-db";

export const useSidebarData = (): Pick<
  SidebarProps,
  "settingsProps" | "pageHandlers"
> => {
  /** DB */
  const { deleteFromDB, updateDB } = useMockDB();
  /** Store */
  const settings = useSettingsStore((state) => ({
    account: state.account,
    workspace: state.workspace,
  }));
  const updateSettings = useSettingsStore((state) => state.update);
  const resetSettings = useSettingsStore((state) => state.reset);
  // const clerkId = usePlatformStore((state) => state.clerkId);
  const accountId = usePlatformStore((state) => state.user?.id);
  const workspaceId = usePlatformStore((state) => state.activeWorkspace);
  const updateAccount = usePlatformStore((state) => state.updateUser);
  const updateWorkspace = usePlatformStore((state) => state.updateWorkspace);
  const deleteWorkspace = usePlatformStore((state) => state.deleteWorkspace);

  return {
    settingsProps: {
      settings,
      onUpdate: (data) => {
        if (!accountId || !workspaceId) return;

        updateSettings(data);
        if (data.account)
          void updateDB("accounts", (a) => a.id === accountId, {
            updatedAt: Date.now(),
            ...data.account,
          }).then((ok) => {
            if (ok) updateAccount(data.account!);
          });
        if (data.workspace)
          void updateDB("workspaces", (w) => w.id === workspaceId, {
            lastEditedAt: Date.now(),
            ...data.workspace,
          }).then((ok) => {
            if (ok) updateWorkspace(workspaceId, data.workspace!);
          });
      },
      onDeleteWorkspace: (id) => {
        void deleteFromDB("memberships", (m) => m.workspaceId === id);
        void deleteFromDB("workspaces", (w) => w.id === id).then((ok) => {
          if (ok) {
            deleteWorkspace(id);
            resetSettings();
          }
        });
      },
    },
    pageHandlers: {},
  };
};
