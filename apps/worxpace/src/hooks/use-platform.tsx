"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export interface PlatformStore {
  clerkId: string;
  accountId: string;
  workspaceId: string;
}

const initial: PlatformStore = {
  clerkId: "",
  accountId: "",
  workspaceId: "",
};

export const usePlatform = () => {
  const [value, update] = useLocalStorage<PlatformStore>("platform", initial);
  /** Routing */
  const router = useRouter();
  const toToolsPage = (id: string, group: string | null) => {
    if (group) router.push(`/${group}/${id}`);
  };
  return { toToolsPage, ...value, update, reset: () => update(initial) };
};
