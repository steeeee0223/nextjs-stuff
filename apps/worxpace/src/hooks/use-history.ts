"use client";

import useSWR, { type Fetcher } from "swr";

import type { Log } from "@acme/ui/custom";

import { auditLogs, type HistoryKey } from "~/lib";

const fetcher: Fetcher<Log[], HistoryKey> = async ({ pageId }) => {
  try {
    const logs = await auditLogs.getByEntity(pageId);
    return logs.map(({ account, action, entity, createdAt }) => ({
      username: account.preferredName,
      avatar: account.avatarUrl,
      action,
      entity,
      createdAt,
    }));
  } catch {
    throw new Error("History not found");
  }
};

export const useHistory = (pageId: string | null) => {
  const key = pageId ? { type: "history" as const, pageId } : null;
  const { data, isLoading, error, mutate } = useSWR<
    Log[],
    Error,
    HistoryKey | null
  >(key, fetcher, {
    onError: (e: Error) => console.log(`[swr:history]: ${e.message}`),
    revalidateIfStale: true,
    revalidateOnMount: true,
  });

  return { logs: data, isLoading, error, trigger: mutate };
};
