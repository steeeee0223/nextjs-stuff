import { http, HttpResponse } from "msw";

import { LiveblocksClient } from "@swy/liveblocks";

import { env } from "@/env";
import { getSession } from "./auth";

const liveblocks = new LiveblocksClient({
  secret: env.STORYBOOK_LIVEBLOCKS_SECRET_KEY,
});

export const liveblocksAuth = http.post(
  `${window.origin}/api/liveblocks`,
  async (ctx) => {
    // Get the current user's unique id and info from your database
    const {
      room,
      user: { id, ...userInfo },
    } = await getSession(ctx.request);
    console.log(`[room:${room}] user: ${userInfo.name}`);

    // Create a Liveblocks session for the current user
    // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
    const session = liveblocks.prepareSession(id, { userInfo });

    // Use a naming pattern to allow access to rooms with a wildcard
    session.allow(room, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { body, status } = await session.authorize();

    const res = JSON.parse(body) as { token: string };
    console.log(`[room:${room}] token: ${res.token.slice(0, 10)}`);

    return HttpResponse.json(res, { status });
  },
);
