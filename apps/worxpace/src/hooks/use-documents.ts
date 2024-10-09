"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { Page } from "@swy/ui/notion";

import {
  archiveDocument,
  createDocument,
  deleteDocument,
  restoreDocument,
  updateDocument,
} from "~/actions";
import {
  fetchUrl,
  toPage,
  type DetailedDocument,
  type DocumentsKey,
} from "~/lib";

const fetcher = async ({ workspaceId }: DocumentsKey) => {
  try {
    return await fetchUrl<DetailedDocument[]>(
      `/api/documents?workspaceId=${workspaceId}`,
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred while fetching documents");
  }
};

export const useDocuments = ({
  workspaceId,
}: {
  workspaceId?: string | null;
}) => {
  const router = useRouter();
  /** Fetcher */
  const key = workspaceId ? { type: "document" as const, workspaceId } : null;
  const {
    data: documents,
    isLoading,
    error,
    mutate,
  } = useSWR<DetailedDocument[], Error>(key, fetcher, {
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  const fetchPages = async (): Promise<Page[]> => {
    const documents = await mutate();
    if (!documents) return [];
    return documents.map((document) => toPage(document)!);
  };
  /** Mutations */
  const onError = (e: Error) => toast.error(e.message);
  const { trigger: create } = useSWRMutation(key, createDocument, {
    onSuccess: (data) => {
      toast.success(`Page Created: ${data.title}`);
      router.push(`/${data.type}/${data.id}`);
    },
    onError,
  });
  const { trigger: update } = useSWRMutation(key, updateDocument, { onError });
  const { trigger: archive } = useSWRMutation(key, archiveDocument, {
    onSuccess: ({ item }) => {
      toast.success(`"${item.title}" Moved to Trash`);
      router.push(`/workspace/${workspaceId}`);
    },
    onError,
  });
  const { trigger: restore } = useSWRMutation(key, restoreDocument, {
    onSuccess: ({ item }) => {
      toast.success(`Restored document "${item.title}"`);
      router.push(`/document/${item.id}`);
    },
    onError,
  });
  const { trigger: remove } = useSWRMutation(key, deleteDocument, {
    onSuccess: (data) => {
      toast.success(`Deleted document "${data.item.title}"`);
      router.push(`/workspace/${workspaceId}`);
    },
    onError,
  });

  return {
    documents,
    isLoading,
    error,
    fetchPages,
    create,
    update,
    archive,
    restore,
    remove,
  };
};
