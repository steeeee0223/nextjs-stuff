"use client";

import { PropsWithChildren, ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "~/liveblocks.config";

interface RoomProps extends PropsWithChildren {
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
