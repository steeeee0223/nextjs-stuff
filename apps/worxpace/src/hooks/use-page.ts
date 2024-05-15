"use client";

import useSWR from "swr";

import type { Document } from "@acme/prisma";
import type { TreeItem } from "@acme/ui/custom";

import { fetchUrl, getDocument, toIconInfo } from "~/lib";

export interface PageState {
  page?: Document;
  isLoading: boolean;
  error?: Error;
}
export const usePage = (id: string | null, preview: boolean) => {
  const {
    data: page,
    isLoading,
    error,
  } = useSWR<Document, Error>(id ? [id, preview] : null, getDocument, {
    onSuccess: ({ title, icon }) => console.log(`[swr:page] ${title} - `, icon),
    onError: (e) => console.log(`[swr:page]: ${e.message}`),
    revalidateIfStale: true,
    revalidateOnMount: true,
  });

  return { page, isLoading, error };
};

export const usePages = (
  workspaceId: string,
  onSuccess?: (data: TreeItem[]) => void,
) => {
  const fetchItems = async (): Promise<TreeItem[]> => {
    try {
      const documents: Document[] = await fetchUrl(`/api/documents/`);
      return documents.map((doc) => ({
        ...doc,
        icon: toIconInfo(doc.icon),
        group: doc.isArchived ? `trash:${doc.type}` : doc.type,
      }));
    } catch {
      throw new Error("Error occurred while fetching documents");
    }
  };
  const {
    data: documents,
    isLoading,
    error,
  } = useSWR<TreeItem[], Error>(`doc:${workspaceId}`, fetchItems, {
    onSuccess,
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  return { documents, isLoading, error };
};
