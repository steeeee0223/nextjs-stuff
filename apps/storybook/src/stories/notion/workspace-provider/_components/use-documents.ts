"use client";

import useSWR from "swr";

import { documents, mockPages } from "@swy/notion/mock";
import { type TreeItem } from "@swy/ui/shared";

interface DocumentsKey {
  type: "document";
  workspaceId: string;
}

const fetcher = () => Promise.resolve(documents);

export const useDocuments = ({
  workspaceId,
}: {
  workspaceId?: string | null;
}) => {
  /** Fetcher */
  const key = workspaceId
    ? ({ type: "document", workspaceId } as DocumentsKey)
    : null;
  const { isLoading } = useSWR<TreeItem[], Error>(key, fetcher, {
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  const fetchPages = () => Promise.resolve(Object.values(mockPages));

  return { isLoading, fetchPages };
};
