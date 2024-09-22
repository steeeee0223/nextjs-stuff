"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import type { Document } from "@acme/prisma";

import { useEdgeStore } from "~/hooks";
import { type UpdateDocumentHandler } from "~/lib";

interface EditorProps {
  document: Document;
  preview?: boolean;
  onUpdate?: UpdateDocumentHandler;
}

const Editor = ({ document, preview, onUpdate }: EditorProps) => {
  /** Edgestore */
  const { edgestore } = useEdgeStore();
  /** Handlers */
  const onUpdateContent = (content: string) =>
    onUpdate?.({ id: document.id, content });
  const onUploadIntoNote = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };
  /** Block Note Editor */
  const BlockNoteEditor = useMemo(
    () => dynamic(() => import("~/components/collab-editor"), { ssr: false }),
    [],
  );

  return (
    <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
      <BlockNoteEditor
        editable={!preview}
        initialContent={document.content}
        onChange={onUpdateContent}
        onUpload={onUploadIntoNote}
      />
    </div>
  );
};

export default Editor;
