"use client";

import { useRouter } from "next/navigation";
import useSWR, { type Fetcher } from "swr";

import { account, WorkspaceKey } from "~/lib";
import { usePlatform } from "./use-platform";

const fetcher: Fetcher<
  { path: string; workspaceId?: string },
  WorkspaceKey
> = async ({ clerkId }) => {
  if (clerkId === "") return { path: "/select-role" };

  console.log(`[platform] fetching workspaces for ${clerkId}`);
  const acc = await account.byClerkId(clerkId);
  if (!acc) return { path: "/select-role" };

  const workspaceId = acc.memberships[0]?.workspaceId;
  console.log(`[platform] returning first workspace: ${workspaceId}`);
  return {
    path: workspaceId ? `/workspace/${workspaceId}` : "/onboarding",
    workspaceId,
  };
};

export const useInitialWorkspace = () => {
  const { clerkId, workspaceId, update } = usePlatform();
  /** Routing */
  const router = useRouter();
  /** Initial Workspace */
  const key: WorkspaceKey | null =
    clerkId === "" || workspaceId !== ""
      ? null
      : { type: "workspace", clerkId };
  const { mutate } = useSWR(key, fetcher, {
    onSuccess: ({ workspaceId, path }) => {
      console.log(`[usePlatform] init workspace success, redirect to ${path}`);
      router.push(path);
      if (workspaceId) update((prev) => ({ ...prev, workspaceId }));
    },
    onError: (e: Error) => console.log(`[platform] Unexpected error: ${e}`),
  });
  return {
    initialize: () => mutate(),
  };
};
