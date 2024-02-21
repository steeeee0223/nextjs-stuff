"use client";

import { useCallback, useEffect, useState } from "react";
import { Editor, type JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { debounce } from "lodash";

import "./styles.css";

import { extensions } from "./extensions/starter-kit";
import CustomBubbleMenu from "./menu/bubble-menu";
import { mockContent } from "./mock";

export interface SettingsType {
  //   font: string;
  //   smallText: boolean;
  //   fullWidth: boolean;
  lock: boolean;
}

export interface EditorMetadata {
  content: JSONContent;
  settings: SettingsType;
}

export interface EditorProps {
  meta: EditorMetadata;
  onUpdateContent?: (content: JSONContent) => void;
}

export const TiptapEditor = ({ meta, onUpdateContent }: EditorProps) => {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(
    mockContent,
  );

  const logContent = useCallback(
    (e: Editor) => handleContentUpdate(e.getJSON()),
    [],
  );
  const handleContentUpdate = (content: JSONContent) =>
    setEditorContent(content);

  useEffect(() => {
    const saveContent = debounce((content: JSONContent | null) => {
      if (content && meta.content !== content) onUpdateContent?.(content);
    }, 2000);

    saveContent(editorContent);

    return () => saveContent.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleContentUpdate]);

  const editor = useEditor({
    extensions: [...extensions],
    editorProps: {
      attributes: {
        class: `main-editor`,
        spellCheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    editable: !meta.settings.lock,
    content: mockContent,
    onUpdate: ({ editor }) => logContent(editor),
  });

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     console.log(editor);
  //     editor?.setEditable(!meta.settings.lock);
  //     editor?.commands.setContent(meta.content);
  //     setEditorContent(meta.content);
  //   }, 0);

  //   return () => clearTimeout(timeoutId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [meta]);

  return (
    editor && (
      <>
        <CustomBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  );
};
