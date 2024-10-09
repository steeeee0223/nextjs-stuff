"use client";

import { createClient, createRoomContext } from "@swy/liveblocks";

const client = createClient({ authEndpoint: "/api/liveblocks" });
export const { useOthers, useRoom, useSelf } = createRoomContext(client);
