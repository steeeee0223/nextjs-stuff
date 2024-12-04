"use client";

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

  return {
    ...value,
    update,
    reset: () => update(initial),
  };
};
