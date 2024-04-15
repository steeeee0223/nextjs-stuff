"use client";

import useSWR, { type Fetcher } from "swr";

import type { Log } from "@acme/ui/custom";

import { auditLogs } from "~/lib";

export const useHistory = (pageId: string | null) => {
  const fetcher: Fetcher<Log[], string> = async (key) => {
    try {
      const [, pageId] = key.split(":");
      const logs = await auditLogs.getByEntity(pageId!);
      return logs.map(({ user, action, entity, createdAt }) => ({
        username: user.name,
        avatar: user.image,
        action,
        entity,
        createdAt,
      }));
    } catch (e) {
      throw new Error("History not found");
    }
  };

  const { data, isLoading, error, mutate } = useSWR<Log[], Error>(
    pageId ? `history:${pageId}` : null,
    fetcher,
    {
      onError: (e) => console.log(`[swr:history]: ${e.message}`),
      revalidateIfStale: true,
      revalidateOnMount: true,
    },
  );

  return { logs: data, isLoading, error, trigger: mutate };
};
