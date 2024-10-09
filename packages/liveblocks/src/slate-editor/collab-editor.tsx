"use client";

import { useEffect, useState } from "react";
import { useRoom } from "@liveblocks/react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import * as Y from "yjs";

import { SlateEditor } from "./slate-editor";

export function CollaborativeEditor() {
  const room = useRoom();
  const [connected, setConnected] = useState(false);
  const [sharedType, setSharedType] = useState<Y.XmlText>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    const sharedDoc = yDoc.get("slate", Y.XmlText);
    yProvider.on("sync", setConnected);

    setSharedType(sharedDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.off("sync", setConnected);
      yProvider.destroy();
    };
  }, [room]);

  if (!connected || !sharedType || !provider) {
    return <div className="pl-[54px]">Loading...</div>;
  }

  return <SlateEditor sharedType={sharedType} />;
}
