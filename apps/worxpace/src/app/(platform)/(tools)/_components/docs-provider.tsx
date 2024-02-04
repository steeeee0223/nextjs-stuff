"use client";

import { type PropsWithChildren } from "react";
import { useParams, useRouter } from "next/navigation";

import { Document } from "@acme/prisma";
import { TreeProvider } from "@acme/ui/components";

import { fetchUrl } from "~/lib";
import SearchCommand from "./search-command";
import { Sidebar } from "./sidebar";

const DocsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const params = useParams();
  /** Docs */
  const onClickItem = (id: string) => router.push(`/documents/${id}`);
  const isItemActive = (id: string) => params.documentId === id;
  const fetchItems = async () => {
    try {
      const data: Document[] = await fetchUrl(`/api/documents/`);
      return { data };
    } catch {
      return { error: `Error occurred while fetching documents` };
    }
  };

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      fetchItems={fetchItems}
      onClickItem={onClickItem}
      isItemActive={isItemActive}
    >
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </TreeProvider>
  );
};

export default DocsProvider;
