"use client";

import { useEffect, useState } from "react";
import type { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import * as Y from "yjs";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";

import { LiveblocksYjsProvider } from "@swy/liveblocks";

import { schema, type CustomEditor } from "~/components/blocknote";
import { useRoom, useSelf } from "~/hooks";
import { connectionIdToColor } from "~/lib";
import { CustomSlashMenu } from "./blocknote";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
}

// Collaborative text editor with simple rich text, live cursors, and live avatars
export default function CollaborativeEditor(props: EditorProps) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;
  return <BlockNote doc={doc} provider={provider} {...props} />;
}

interface BlockNoteProps extends EditorProps {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
}

function BlockNote({
  doc,
  provider,
  initialContent,
  editable,
  onChange,
  onUpload,
}: BlockNoteProps) {
  // Get user info from Liveblocks authentication endpoint
  const user = useSelf();

  const editor: CustomEditor = useCreateBlockNote({
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: onUpload,
    collaboration: {
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information for this user:
      user: {
        name: user.name,
        color: connectionIdToColor(user.name.length),
      },
    },
  });

  const { resolvedTheme } = useTheme();

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
}
