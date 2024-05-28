"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useSettingsStore } from "@acme/ui/notion";

import { updateSettings } from "~/actions";
import { settings } from "~/lib";

export const useSettings = (userId: string) => {
  const { user, account } = useSettingsStore();

  const { data, isLoading, mutate } = useSWR(`settings:${userId}`, (key) => {
    const [, userId] = key.split(":");
    return settings.get(userId!);
  });
  const { trigger } = useSWRMutation(`settings:${userId}`, updateSettings, {
    onError: (e: Error) => toast.error(e.message),
  });

  return {
    settings: isLoading || !data ? { user, account } : data,
    fetchData: () => mutate(),
    update: trigger,
  };
};
