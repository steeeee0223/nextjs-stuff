"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import { PageHeader } from "@swy/notion";
import { Cover, IconBlock } from "@swy/ui/shared";

import { useDocument } from "~/hooks";
import { toIconInfo } from "~/lib";

interface Params {
  params: {
    documentId: string;
  };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const { page, isLoading } = useDocument({ documentId, preview: true });
  /** Block Note Editor */
  const BlockNoteEditor = useMemo(
    () => dynamic(() => import("~/components/block-editor"), { ssr: false }),
    [],
  );

  if (!page || isLoading) return <PageHeader.Skeleton />;
  return (
    <div className="bg-main pb-40">
      <Cover preview unsplashAPIKey="" url={page.coverImage?.url ?? null} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="group relative pl-[54px]">
          {page.icon && <IconBlock icon={toIconInfo(page.icon)} size="lg" />}
          <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100" />
          <div className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]">
            {page.title}
          </div>
        </div>
        <BlockNoteEditor editable={false} initialContent={page.content} />
      </div>
    </div>
  );
};

export default DocumentPage;
