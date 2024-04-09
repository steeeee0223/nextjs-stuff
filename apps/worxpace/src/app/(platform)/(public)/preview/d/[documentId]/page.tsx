"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { Cover, IconBlock } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";

import { DocHeaderSkeleton } from "~/components";
import { theme } from "~/constants/theme";
import { usePage } from "~/hooks";
import { toIconInfo } from "~/lib";

interface Params {
  params: {
    documentId: string;
  };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const { page: document, isLoading, error } = usePage(documentId, true);
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
          {document.icon && (
            <IconBlock
              defaultIcon={toIconInfo(document.icon)}
              editable={false}
              size="lg"
            />
          )}
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
