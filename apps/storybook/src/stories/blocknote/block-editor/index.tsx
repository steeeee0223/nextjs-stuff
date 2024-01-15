"use client";

import type { BlockNoteEditor } from "@blocknote/core";
import type { ReactSlashMenuItem } from "@blocknote/react";
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import { HandIcon } from "lucide-react";
import { useTheme } from "next-themes";

import "@blocknote/core/style.css";

export interface BlockEditorProps {
  initialContent?: string | null;
  editable?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
}

// Command to insert "Hello World" in bold in a new block below.
const insertHelloWorld = (editor: BlockNoteEditor) => {
  // Block that the text cursor is currently in.
  const currentBlock = editor.getTextCursorPosition().block;

  // New block we want to insert.
  const helloWorldBlock = {
    type: "paragraph",
    content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
  };

  // Inserting the new block after the current one.
  editor.insertBlocks([helloWorldBlock], currentBlock, "after");
};

// Custom Slash Menu item which executes the above function.
const insertHelloWorldItem: ReactSlashMenuItem = {
  name: "Insert Hello World",
  execute: insertHelloWorld,
  aliases: ["helloworld", "hw"],
  group: "Other",
  icon: <HandIcon size={18} />,
  hint: "Used to insert a block with 'Hello World' below.",
};

// List containing all default Slash Menu Items, as well as our custom one.
const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(),
  insertHelloWorldItem,
];

export const BlockEditor = ({
  onChange,
  onUpload,
  initialContent,
  editable,
  className,
}: BlockEditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) =>
      onChange?.(JSON.stringify(editor.topLevelBlocks, null, 0)),
    uploadFile: onUpload,
    slashMenuItems: customSlashMenuItemList,
  });

  return (
    <BlockNoteView
      className={className}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
