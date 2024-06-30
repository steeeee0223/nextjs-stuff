"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore } from "@acme/ui/notion";
import type { SettingsStore } from "@acme/ui/notion";

import {
  deleteAccount as _deleteAccount,
  deleteWorkspace as _deleteWorkspace,
  updateAccount as _updateAccount,
  updateWorkspace as _updateWorkspace,
} from "~/actions";
import {
  account as _account,
  workspace as _workspace,
  toIconInfo,
} from "~/lib";

export const useSettings = (
  info: { clerkId: string; workspaceId: string } | null,
) => {
  const { user, account, workspace } = useSettingsStore();

  const key = info ? { type: "settings" as const, ...info } : null;
  const onError = (e: Error) => toast.error(e.message);
  const { data, isLoading, mutate } = useSWR(
    key,
    async ({ clerkId, workspaceId }) => {
      console.log(`fetching `, { clerkId, workspaceId });
      const account = await _account.get(clerkId);
      const workspace = await _workspace.get(workspaceId);
      if (!account || !workspace) throw new Error("Not found!");
      return {
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
  const { trigger: deleteAccount } = useSWRMutation(key, _deleteAccount, {
    onError,
  });
  const { trigger: deleteWorkspace } = useSWRMutation(key, _deleteWorkspace, {
    onError,
  });

  return {
    settings: isLoading || !data ? { user, account, workspace } : data,
    fetchData: () => mutate(),
    updateAccount,
    deleteAccount,
    updateWorkspace,
    deleteWorkspace,
  };
};
