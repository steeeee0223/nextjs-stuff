"use client";

import { createEdgeStoreProvider } from "@edgestore/react";

import type { UploadFile } from "@swy/notion";
import type { CoverImage } from "@swy/prisma";
import type { IconInfo } from "@swy/ui/shared";

import { type EdgeStoreRouter } from "~/app/api/edgestore/[...edgestore]/route";

const { EdgeStoreProvider, useEdgeStore: useInternalEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider };

export const useEdgeStore = () => {
  const { edgestore, ...internalEdgeStore } = useInternalEdgeStore();
  const uploadFile: UploadFile = async (file, options) => {
    const { url } = await edgestore.publicFiles.upload({ file, options });
    return { url };
  };
  const deleteFile = async (data?: CoverImage | IconInfo | null) => {
    if (data?.type !== "file") return;
    const url = data.url;
    try {
      await edgestore.publicFiles.delete({ url });
    } catch {
      console.log(`[edgestore] file with url not found: ${url}`);
    }
  };

  return {
    edgestore,
    uploadFile,
    deleteFile,
    ...internalEdgeStore,
  };
};
