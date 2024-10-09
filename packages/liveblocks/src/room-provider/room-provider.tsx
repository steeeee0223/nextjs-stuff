"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider as RoomPrimitiveProvider,
} from "@liveblocks/react/suspense";

type RoomProviderProps = React.PropsWithChildren<
  {
    roomId: string;
    fallback?: React.ReactNode;
  } & (
    | { publicApiKey: string; authEndpoint?: never }
    | { publicApiKey?: never; authEndpoint: string }
  )
>;

export function RoomProvider({
  roomId,
  fallback,
  children,
  ...authProps
}: RoomProviderProps) {
  return (
    <LiveblocksProvider {...authProps}>
      <RoomPrimitiveProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomPrimitiveProvider>
    </LiveblocksProvider>
  );
}
