"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";

import { fetchInitialWorkspace, WorkspaceKey } from "~/lib";
import { usePlatform } from "./use-platform";

export const useInitialWorkspace = () => {
  const { clerkId, workspaceId, update } = usePlatform();
  /** Routing */
  const router = useRouter();
  /** Initial Workspace */
  const key: WorkspaceKey | null =
    clerkId === "" || workspaceId !== ""
      ? null
      : { type: "workspace", clerkId };
  const { mutate } = useSWR(key, fetchInitialWorkspace, {
    onSuccess: ({ workspaceId, path }) => {
      console.log(
        `[useInitialWorkspace] init workspace success, redirect to ${path}`,
      );
      router.push(path);
      if (workspaceId) update((prev) => ({ ...prev, workspaceId }));
    },
    onError: (e: Error) =>
      console.log(`[useInitialWorkspace] Unexpected error: ${e.name}`),
  });
  return {
    initialize: () => mutate(),
  };
};
