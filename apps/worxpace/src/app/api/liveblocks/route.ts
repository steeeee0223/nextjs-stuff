import { NextResponse, type NextRequest } from "next/server";

import { LiveblocksClient } from "@swy/liveblocks";

import { env } from "~/env";
import { account, documents, fetchClient } from "~/lib";

const liveblocks = new LiveblocksClient({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(req: NextRequest) {
  const { room } = (await req.json()) as { room: string };

  /** Verify account */
  const { clerkId } = await fetchClient();
  const acc = await account.byClerkId(clerkId);
  if (!acc) return new NextResponse("Unauthorized", { status: 403 });
  const userInfo = {
    name: acc.preferredName,
    email: acc.email,
    avatarUrl: acc.avatarUrl,
  };
  console.log(`[room:${room}] user: ${userInfo.name}`);

  /** Verify room if pageId is provided */
  let workspaceId = "";
  if (room.startsWith("w_")) {
    workspaceId = room.slice(2);
  } else {
    const page = await documents.getById(room);
    if (!page) return new NextResponse("Not Found", { status: 404 });
    workspaceId = page.workspaceId;
  }
  const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
  if (!inWorkspace) return new NextResponse("Unauthorized", { status: 403 });

  /** Register `liveblocks` session  */
  const session = liveblocks.prepareSession(acc.id, { userInfo });
  session.allow(room, session.FULL_ACCESS);
  const { status, body } = await session.authorize();

  const res = JSON.parse(body) as { token: string };
  console.log(`[room:${room}] token: ${res.token.slice(0, 10)}`);

  return new NextResponse(body, { status });
}
