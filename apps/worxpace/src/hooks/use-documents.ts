"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useTree } from "@swy/ui/custom";
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
  toTreeItem,
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
  const { dispatch, onClickItem } = useTree();
  /** Fetcher */
  const key = workspaceId
    ? ({ type: "document", workspaceId } as DocumentsKey)
    : null;
  const {
    data: documents,
    isLoading,
    error,
    mutate,
  } = useSWR<DetailedDocument[], Error>(key, fetcher, {
    onSuccess: (data) =>
      dispatch({ type: "set", payload: data.map(toTreeItem) }),
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
      dispatch({ type: "add", payload: [toTreeItem(data)] });
      toast.success(`Page Created: ${data.title}`);
      onClickItem?.(data.id, data.type);
    },
    onError,
  });
  const { trigger: update } = useSWRMutation(key, updateDocument, {
    onSuccess: (data) =>
      dispatch({ type: "update:item", payload: toTreeItem(data) }),
    onError,
  });
  const { trigger: archive } = useSWRMutation(key, archiveDocument, {
    onSuccess: ({ item, ids }) => {
      dispatch({
        type: "update:group",
        payload: { ids, group: `trash:${item.type}` },
      });
      toast.success(`"${item.title}" Moved to Trash`);
      router.push(`/workspace/${workspaceId}`);
    },
    onError,
  });
  const { trigger: restore } = useSWRMutation(key, restoreDocument, {
    onSuccess: ({ ids, item }) => {
      dispatch({ type: "update:group", payload: { ids, group: item.type } });
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
