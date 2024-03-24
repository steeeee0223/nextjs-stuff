"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import type { Document } from "@acme/prisma";
import { useTree } from "@acme/ui/components";

import { updateInternalDocument } from "~/actions";
import { useEdgeStore } from "~/hooks";

interface EditorProps {
  document: Document;
  preview?: boolean;
}

const Editor = ({ document, preview }: EditorProps) => {
  /** Edgestore */
  const { edgestore } = useEdgeStore();
  /** Tree Actions */
  const { dispatch } = useTree();
  /** Action - update */
  const { trigger: update } = useSWRMutation(
    [document.id, false],
    updateInternalDocument,
    {
      onSuccess: ({ id, parentId, icon, title }) =>
        dispatch({
          type: "update:item",
          payload: { id, parentId, icon, title, group: "document" },
        }),
      onError: (e: Error) => toast.error(e.message),
    },
  );

  const onUpdateContent = (content: string) =>
    update({ id: document.id, content });
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
