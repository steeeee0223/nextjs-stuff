"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { updateInternalDocument } from "~/actions";
import { DetailedDocument, documentFetcher, type DocumentKey } from "~/lib";
import { usePlatform } from "./use-platform";

export const useDocument = (info: Omit<DocumentKey, "type"> | null) => {
  const router = useRouter();
  const platform = usePlatform();
  /** Fetcher */
  const key: DocumentKey | null = info ? { type: "document", ...info } : null;
  const {
    data: page,
    isLoading,
    error,
  } = useSWR<DetailedDocument, Error>(key, documentFetcher, {
    onSuccess: (data) => {
      if (!data.isPublished && data.workspaceId !== platform.workspaceId)
        platform.update((prev) => ({ ...prev, workspaceId: data.workspaceId }));
    },
    onError: (e) => {
      console.log(`[swr:page]: ${e.message}`);
      if (info?.preview) router.push("/");
    },
    revalidateIfStale: true,
    revalidateOnMount: true,
  });
  /** Mutations */
  const { trigger: update } = useSWRMutation(key, updateInternalDocument, {
    onError: (e: Error) => toast.error(e.message),
  });

  return { page, isLoading, error, update };
};
