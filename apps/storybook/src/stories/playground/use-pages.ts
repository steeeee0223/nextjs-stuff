import useSWR from "swr";

import { usePlatformStore, type Page } from "@swy/notion";
import { mockPages } from "@swy/notion/mock";

import { delay } from "@/lib/utils";

const fetcher = async () => {
  await delay(2000);
  return await Promise.resolve(Object.values(mockPages));
};

export const usePages = (workspaceId: string | null) => {
  const activePage = usePlatformStore((state) => state.activePage);
  const setActivePage = usePlatformStore((state) => state.setActivePage);
  const setPages = usePlatformStore((state) => state.setPages);
  const updatePage = usePlatformStore((state) => state.updatePage);
  const deletePage = usePlatformStore((state) => state.deletePage);

  const { isLoading } = useSWR<Page[], Error>(workspaceId, fetcher, {
    onSuccess: (data) => setPages(data),
    onError: (e) => console.log(`[swr:workspace]: ${e.message}`),
  });
  const selectPage = (path: string) => {
    const [, , id] = path.split("/");
    if (!id) return;
    setActivePage(id);
  };

  return {
    pageId: activePage ?? "#",
    isLoading,
    selectPage,
    updatePage,
    deletePage,
  };
};
