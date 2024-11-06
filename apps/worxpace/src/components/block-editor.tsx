"use client";

import type { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

import { useTheme } from "@swy/ui/shadcn";

import { schema, type CustomEditor } from "~/components/blocknote";
import { CustomSlashMenu } from "./blocknote";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
}

const Editor = ({
  onChange,
  initialContent,
  editable,
  onUpload,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor: CustomEditor = useCreateBlockNote({
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: onUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        slashMenu={false}
        editable={editable}
        onChange={() => onChange?.(JSON.stringify(editor.document))}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <CustomSlashMenu editor={editor} />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
