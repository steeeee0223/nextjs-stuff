"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { v4 } from "uuid";

import { useSettingsStore, useWorkspace } from "@swy/ui/notion";

import {
  createAccount as $addAccount,
  createWorkspace as $addWorkspace,
  deleteAccount as $delAccount,
  deleteWorkspace as $delWorkspace,
  updateAccount as $updAccount,
  updateWorkspace as $updWorkspace,
} from "~/actions";
import {
  account,
  NotFound,
  toIconInfo,
  toSettingsStore,
  toWorkspaceList,
  workspace,
  type SettingsKey,
} from "~/lib";
import { usePlatform } from "./use-platform";

export const useSetup = ({ clerkId }: { clerkId: string }) => {
  const router = useRouter();
  const { update } = usePlatform();
  /** Fetcher */
  const key: SettingsKey = { type: "settings", clerkId };
  const { data, isLoading, mutate } = useSWR(key, async ({ clerkId }) => {
    const data = await account.joinedWorkspaces(clerkId);
    if (!data) throw new NotFound();
    const workspaces = toWorkspaceList(data);
    return { ...data, workspaces };
  });
  /** Mutations */
  const onError = (e: Error) => toast.error(e.message);
  const { trigger: createAccount } = useSWRMutation(key, $addAccount, {
    onSuccess: ({ id }) =>
      update((prev) => ({ ...prev, clerkId, accountId: id })),
  });
  const { trigger: createWorkspace } = useSWRMutation(key, $addWorkspace, {
    onSuccess: ({ id }) => {
      update((prev) => ({ ...prev, workspaceId: id }));
      router.push(`/workspace/${id}`);
    },
    onError,
  });

  return {
    isLoading: !data || isLoading,
    accountMemberships: data,
    fetchData: () => mutate(),
    createAccount,
    createWorkspace,
  };
};

export const useSettings = (
  info: { clerkId: string; workspaceId: string } | null,
) => {
  const settingsStore = useSettingsStore();
  /** Fetcher */
  const key = info ? { type: "settings" as const, ...info } : null;
  const options = { onError: (e: Error) => toast.error(e.message) };
  const { data, isLoading } = useSWR(key, async ({ clerkId, workspaceId }) => {
    console.log(`[settings] `, { clerkId, workspaceId });
    const $account = await account.byClerkId(clerkId);
    const $workspace = await workspace.get(workspaceId);
    if (!$account || !$workspace) throw new Error("Not found!");
    return toSettingsStore($account, $workspace);
  });
  /** Mutations */
  const { dispatch } = useWorkspace();
  const { trigger: updateAccount } = useSWRMutation(key, $updAccount, options);
  const { trigger: updateWorkspace } = useSWRMutation(key, $updWorkspace, {
    ...options,
    onSuccess: ({ id, name, icon }) =>
      dispatch({
        type: "update",
        payload: { id, name, icon: toIconInfo(icon) },
      }),
  });
  const { trigger: deleteAccount } = useSWRMutation(key, $delAccount, options);
  const { trigger: deleteWorkspace } = useSWRMutation(key, $delWorkspace, {
    ...options,
    onSuccess: ({ id }) => dispatch({ type: "delete", payload: [id] }),
  });

  const resetLink = async () => {
    const inviteToken = v4();
    await updateWorkspace({ inviteToken });
    settingsStore.update({
      workspace: {
        inviteLink: `${window.location.origin}/invite/${inviteToken}`,
      },
    });
    toast.message("New link generated");
  };

  return {
    settings: isLoading || !data ? settingsStore : data,
    updateAccount,
    updateWorkspace,
    deleteAccount,
    deleteWorkspace,
    resetLink,
  };
};
