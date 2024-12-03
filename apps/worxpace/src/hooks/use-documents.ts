"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { DocItemData } from "@swy/notion";
import { useTree } from "@swy/ui/shared";

import {
  archiveDocument,
  createDocument,
  deleteDocument,
  restoreDocument,
  updateDocument,
} from "~/actions";
import {
  documentsFetcher,
  toDocItem,
  toPage,
  type DetailedDocument,
} from "~/lib";

export const useDocuments = ({
  workspaceId,
}: {
  workspaceId?: string | null;
}) => {
  const router = useRouter();
  const setNodes = useTree((state) => state.set<DocItemData>);
  /** Fetcher */
  const key = workspaceId ? { type: "document" as const, workspaceId } : null;
  const {
    data: documents,
    isLoading,
    error,
    mutate,
  } = useSWR<DetailedDocument[], Error>(key, documentsFetcher, {
    onSuccess: (data) => setNodes(data.map(toDocItem)),
    onError: (e) => console.log(`[swr:document]: ${e.message}`),
  });
  const fetchPages = async () => {
    const documents = await mutate();
    return documents?.map((document) => toPage(document)!) ?? [];
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
