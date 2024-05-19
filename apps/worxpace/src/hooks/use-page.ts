"use client";

import useSWR from "swr";

import type { Document } from "@acme/prisma";
import { useTree } from "@acme/ui/custom";

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

export const usePages = (workspaceId: string) => {
  const { dispatch } = useTree();
  const fetchItems = async () => {
    try {
      return await fetchUrl<Document[]>(`/api/documents/`);
    } catch {
      throw new Error("Error occurred while fetching documents");
    }
  };
  const {
    data: documents,
    isLoading,
    error,
    mutate,
  } = useSWR<Document[], Error>(`doc:${workspaceId}`, fetchItems, {
    onSuccess: (data) =>
      dispatch({
        type: "set",
        payload: data.map((doc) => ({
          ...doc,
          icon: toIconInfo(doc.icon),
          group: doc.isArchived ? `trash:${doc.type}` : doc.type,
        })),
      }),
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  return { documents, isLoading, error, trigger: mutate };
};
