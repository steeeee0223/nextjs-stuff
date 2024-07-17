"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useTree } from "@acme/ui/custom";

import { updateInternalDocument } from "~/actions";
import {
  DetailedDocument,
  documentFetcher,
  toIconInfo,
  type DocumentKey,
} from "~/lib";

export const useDocument = (info: Omit<DocumentKey, "type"> | null) => {
  const { dispatch } = useTree();
  /** Fetcher */
  const key: DocumentKey | null = info ? { type: "document", ...info } : null;
  const {
    data: page,
    isLoading,
    error,
  } = useSWR<DetailedDocument, Error>(key, documentFetcher, {
    onSuccess: ({ title, icon }) => console.log(`[swr:page] ${title} - `, icon),
    onError: (e) => console.log(`[swr:page]: ${e.message}`),
    revalidateIfStale: true,
    revalidateOnMount: true,
  });
  /** Mutations */
  const onError = (e: Error) => toast.error(e.message);
  const { trigger: update } = useSWRMutation(key, updateInternalDocument, {
    onSuccess: (data) => {
      dispatch({
        type: "update:item",
        payload: { ...data, icon: toIconInfo(data.icon), group: data.type },
      });
    },
    onError,
  });

  return { page, isLoading, error, update };
};
