"use client";

import { useEffect, useState } from "react";
import type { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import LiveblocksProvider from "@liveblocks/yjs";
import { useTheme } from "next-themes";
import * as Y from "yjs";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

import { useRoom, useSelf } from "~/liveblocks.config";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export default function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] =
    useState<LiveblocksProvider<never, never, never, never>>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} />;
}

interface EditorProps {
  doc: Y.Doc;
  provider: LiveblocksProvider<never, never, never, never>;
}

function BlockNote({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo?.name ?? "User",
        color: userInfo?.picture ?? "",
      },
    },
  });

  const { resolvedTheme } = useTheme();

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}
