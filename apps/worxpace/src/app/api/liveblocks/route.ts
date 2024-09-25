import { NextResponse, type NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

import { env } from "~/env";
import { account, documents, fetchClient } from "~/lib";
import { UserInfo } from "~/liveblocks.config";

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(req: NextRequest) {
  /** Clerk user */
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 403 });
  /** Find document */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { room }: { room: string } = await req.json();
  const page = await documents.getById(room);
  if (!page) return new NextResponse("Not Found", { status: 404 });
  /** Verify account & workspace */
  const { clerkId } = await fetchClient();
  const acc = await account.byClerkId(clerkId);
  const inWorkspace = await account.isInWorkspace({
    clerkId,
    workspaceId: page.workspaceId,
  });
  if (!acc || !inWorkspace)
    return new NextResponse("Unauthorized", { status: 403 });
  /** Liveblocks data */
  const userInfo: UserInfo["info"] = {
    name: acc.preferredName,
    email: acc.email,
    avatarUrl: acc.avatarUrl,
  };
  console.log(userInfo);
  const session = liveblocks.prepareSession(acc.id, { userInfo });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const token = JSON.parse(body).token.slice(0, 10) as string;
  console.log({ roomId: room, token });
  return new NextResponse(body, { status });
}
