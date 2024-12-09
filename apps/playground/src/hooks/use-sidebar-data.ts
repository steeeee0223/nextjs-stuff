"use client";

import { useCallback, useEffect } from "react";

import { SidebarProps, useSettingsStore } from "@swy/notion";
import { useOrigin } from "@swy/ui/hooks";

import { toSettingsStore } from "~/db";
import { useMockDB } from "./useMockDB";

export const useSidebarData = (
  accountId: string,
  workspaceId: string,
): Pick<SidebarProps, "settingsProps" | "pageHandlers"> => {
  const { findAccount, findWorkspace, findAccountMemberships } = useMockDB();
  const origin = useOrigin();
  const { account, workspace } = useSettingsStore();
  const getSettings = useCallback(async () => {
    const account = await findAccount(accountId);
    const workspace = await findWorkspace(workspaceId);
    if (!account || !workspace) throw new Error("Not found");
    const memberships = await findAccountMemberships(accountId);
    const role = memberships.find((w) => w.id === workspaceId)!.role;
    return toSettingsStore(account, workspace, role, origin);
  }, [
    accountId,
    findAccount,
    findAccountMemberships,
    findWorkspace,
    origin,
    workspaceId,
  ]);

  useEffect(() => {
    getSettings();
  }, []);

  return {
    settingsProps: { settings: { account, workspace } },
  };
};
