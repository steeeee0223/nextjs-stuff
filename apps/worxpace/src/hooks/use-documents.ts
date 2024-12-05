"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { DocItemData } from "@swy/notion";
import { Document } from "@swy/prisma";
import { useTree } from "@swy/ui/shared";

import * as actions from "~/actions";
import { documentsFetcher, toDocItem, toPage } from "~/lib";
import { usePeopleSettings } from "./use-people-settings";

export const useDocuments = ({
  clerkId,
  workspaceId,
}: {
  clerkId: string;
  workspaceId?: string | null;
}) => {
  const router = useRouter();
  const setNodes = useTree((state) => state.set<DocItemData>);
  /** Memberships */
  const { memberships } = usePeopleSettings(
    workspaceId ? { clerkId, workspaceId } : null,
  );
  /** Fetcher */
  const key = workspaceId ? { type: "document" as const, workspaceId } : null;
  const {
    data: documents,
    isLoading,
    error,
    mutate,
  } = useSWR<Document[], Error>(key, documentsFetcher, {
    onSuccess: (data) =>
      setNodes(data.map((doc) => toDocItem(doc, memberships))),
    onError: (e) => console.log(`[swr:document]: ${e.message}`),
  });
  const fetchPages = async () => {
    const documents = await mutate();
    return documents?.map((document) => toPage(document)!) ?? [];
  };
  /** Mutations */
  const onError = (e: Error) => toast.error(e.message);
  const { trigger: create } = useSWRMutation(key, actions.createDocument, {
    onSuccess: (data) => {
      toast.success(`Page Created: ${data.title}`);
      router.push(`/${data.type}/${data.id}`);
    },
    onError,
  });
  const { trigger: update } = useSWRMutation(key, actions.updateDocument, {
    onError,
  });
  const { trigger: archive } = useSWRMutation(key, actions.archiveDocument, {
    onSuccess: ({ item }) => {
      toast.success(`"${item.title}" Moved to Trash`);
      router.push(`/workspace/${workspaceId}`);
    },
    onError,
  });
  const { trigger: restore } = useSWRMutation(key, actions.restoreDocument, {
    onSuccess: ({ item }) => {
      toast.success(`Restored document "${item.title}"`);
      router.push(`/document/${item.id}`);
    },
    onError,
  });
  const { trigger: remove } = useSWRMutation(key, actions.deleteDocument, {
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
