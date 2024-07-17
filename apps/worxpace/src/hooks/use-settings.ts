"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore, useWorkspace } from "@acme/ui/notion";
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
  NotFound,
  toIconInfo,
  type SettingsKey,
} from "~/lib";
import { usePlatform } from "./use-platform";

export const useSetup = ({ clerkId }: { clerkId: string }) => {
  const router = useRouter();
  const { update } = usePlatform();
  /** Fetcher */
  const key: SettingsKey = { type: "settings", clerkId };
  const { data, isLoading, mutate } = useSWR(key, async ({ clerkId }) => {
    const data = await _account.get(clerkId);
    if (!data) throw new NotFound();
    return data;
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
  const { account, workspace } = useSettingsStore();
  /** Fetcher */
  const key = info ? { type: "settings" as const, ...info } : null;
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
  /** Mutations */
  const { dispatch } = useWorkspace();
  const { trigger: updateAccount } = useSWRMutation(key, $updAccount, options);
  const { trigger: updateWorkspace } = useSWRMutation(key, $updWorkspace, {
    ...options,
    onSuccess: ({ id, name, icon }) =>
      dispatch({ type: "update", payload: { id, name, icon } }),
  });
  const { trigger: deleteAccount } = useSWRMutation(key, $delAccount, options);
  const { trigger: deleteWorkspace } = useSWRMutation(key, $delWorkspace, {
    ...options,
    onSuccess: ({ id }) => dispatch({ type: "delete", payload: [id] }),
  });

  return {
    settings: isLoading || !data ? { account, workspace } : data,
    fetchData: () => mutate(),
    updateAccount,
    updateWorkspace,
    deleteAccount,
    deleteWorkspace,
  };
};
