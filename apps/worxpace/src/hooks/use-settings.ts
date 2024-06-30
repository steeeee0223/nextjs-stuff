"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore } from "@acme/ui/notion";
import type { SettingsStore } from "@acme/ui/notion";

import {
  createAccount as $addAccount,
  createWorkspace as $addWorkspace,
  deleteAccount as $delAccount,
  deleteWorkspace as $delWorkspace,
  updateAccount as $updAccount,
  updateWorkspace as $updWorkspace,
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
  const userKey = info
    ? { type: "settings" as const, clerkId: info.clerkId }
    : null;
  const options = { onError: (e: Error) => toast.error(e.message) };
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
  const { trigger: createAccount } = useSWRMutation(
    userKey,
    $addAccount,
    options,
  );
  const { trigger: createWorkspace } = useSWRMutation(
    userKey,
    $addWorkspace,
    options,
  );
  const { trigger: updateAccount } = useSWRMutation(key, $updAccount, options);
  const { trigger: updateWorkspace } = useSWRMutation(
    key,
    $updWorkspace,
    options,
  );
  const { trigger: deleteAccount } = useSWRMutation(key, $delAccount, options);
  const { trigger: deleteWorkspace } = useSWRMutation(
    key,
    $delWorkspace,
    options,
  );

  return {
    settings: isLoading || !data ? { user, account, workspace } : data,
    fetchData: () => mutate(),
    createAccount,
    createWorkspace,
    updateAccount,
    updateWorkspace,
    deleteAccount,
    deleteWorkspace,
  };
};
