"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore } from "@acme/ui/notion";
import type { SettingsStore } from "@acme/ui/notion";

import {
  updateAccount as _updateAccount,
  updateWorkspace as _updateWorkspace,
} from "~/actions";
import {
  account as _account,
  workspace as _workspace,
  getUser,
  toIconInfo,
} from "~/lib";

export const useSettings = (info: { userId: string; workspaceId: string }) => {
  const { user, account, workspace } = useSettingsStore();

  const key = { type: "settings", ...info } as const;
  const onError = (e: Error) => toast.error(e.message);
  const { data, isLoading, mutate } = useSWR(
    key,
    async ({ userId, workspaceId }) => {
      const user = await getUser(userId);
      const account = await _account.get(userId);
      const workspace = await _workspace.get(workspaceId);
      if (!account || !workspace) throw new Error("Not found!");
      return {
        user,
        account,
        workspace: { ...workspace, icon: toIconInfo(workspace.icon) },
      } satisfies SettingsStore;
    },
  );
  const { trigger: updateAccount } = useSWRMutation(key, _updateAccount, {
    onError,
  });
  const { trigger: updateWorkspace } = useSWRMutation(key, _updateWorkspace, {
    onError,
  });

  return {
    settings: isLoading || !data ? { user, account, workspace } : data,
    fetchData: () => mutate(),
    updateAccount,
    updateWorkspace,
  };
};
