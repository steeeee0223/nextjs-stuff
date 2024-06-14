"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore } from "@acme/ui/notion";

import { updateAccountSettings, updateWorkspaceSettings } from "~/actions";
import { settings } from "~/lib";

export const useSettings = (info: { userId: string; workspaceId: string }) => {
  const { user, account, workspace } = useSettingsStore();

  const key = { type: "settings", ...info } as const;
  const onError = (e: Error) => toast.error(e.message);
  const { data, isLoading, mutate } = useSWR(
    key,
    async ({ userId, workspaceId }) => ({
      user: await settings.getUser(userId),
      account: await settings.getAccount(userId),
      workspace: await settings.getWorkspace(workspaceId),
    }),
  );
  const { trigger: updateAccount } = useSWRMutation(
    key,
    updateAccountSettings,
    { onError },
  );
  const { trigger: updateWorkspace } = useSWRMutation(
    key,
    updateWorkspaceSettings,
    { onError },
  );

  return {
    settings: isLoading || !data ? { user, account, workspace } : data,
    fetchData: () => mutate(),
    updateAccount,
    updateWorkspace,
  };
};
