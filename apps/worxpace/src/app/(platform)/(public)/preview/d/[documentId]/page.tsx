"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import useSWR from "swr";

import type { Document } from "@acme/prisma";
import { Cover } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { getDocument } from "~/app/(platform)/_functions";
import { DocHeaderSkeleton } from "~/components";
import { theme } from "~/constants/theme";

interface Params {
  params: {
    documentId: string;
  };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const {
    data: document,
    isLoading,
    error,
  } = useSWR<Document, Error>([documentId, true], getDocument, {
    onSuccess: (_data, key) => console.log(`[swr] ${key} fetched data`),
    onError: (e, key) => console.log(`[swr] ${key}: ${e.message}`),
  });
  /** Block Note Editor */
  const BlockNoteEditor = useMemo(
    () => dynamic(() => import("~/components/block-editor"), { ssr: false }),
    [],
  );

  if (error) return notFound();
  if (!document || isLoading) return <DocHeaderSkeleton />;
  return (
    <div className="pb-40 dark:bg-[#1F1F1F]">
      <Cover preview url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="group relative pl-[54px]">
          {!!document.icon && <p className="pt-6 text-6xl">{document.icon}</p>}
          <div
            className={cn(
              theme.flex.gap1,
              "py-4 opacity-0 group-hover:opacity-100",
            )}
          />
          <div className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]">
            {document.title}
          </div>
        </div>
        <BlockNoteEditor editable={false} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentPage;
