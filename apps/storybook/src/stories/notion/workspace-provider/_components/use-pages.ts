import { useState } from "react";
import useSWR from "swr";

import { documents, mockPages } from "@swy/notion/mock";
import { useTree, type TreeItemData } from "@swy/ui/shared";

const fetcher = () => Promise.resolve(documents);

export const usePages = (workspaceId: string) => {
  const setNodes = useTree((state) => state.set);
  const [pageId, setPageId] = useState("#");

  const { isLoading } = useSWR<TreeItemData[], Error>(workspaceId, fetcher, {
    onSuccess: setNodes,
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  const fetchPages = () => Promise.resolve(Object.values(mockPages));
  const selectPage = (path: string) => {
    const [, , id] = path.split("/");
    if (!id) return;
    setPageId(id);
  };

  return { pageId, isLoading, fetchPages, selectPage };
};
