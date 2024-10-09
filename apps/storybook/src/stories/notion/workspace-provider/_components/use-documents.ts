"use client";

import useSWR from "swr";

import { type TreeItem } from "@swy/ui/custom";

import { documents, mockPages } from "../../__mock__";

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
