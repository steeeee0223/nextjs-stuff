import { NextResponse, type NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";

import { worxpace } from "@acme/prisma";

import { env } from "~/env";

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(req: NextRequest) {
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user)
    return new NextResponse("Unauthorized", { status: 403 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { room }: { room: string } = await req.json();
  const page = await worxpace.document.findUnique({ where: { id: room } });

  if (
    page?.userId !== authorization.userId &&
    page?.orgId !== authorization.orgId
  )
    return new NextResponse("Unauthorized", { status: 403 });

  const userInfo = { name: user.firstName ?? "User", picture: user.imageUrl };
  console.log(userInfo);
  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const token = JSON.parse(body).token.slice(0, 10) as string;
  console.log({ roomId: room, token });
  return new NextResponse(body, { status });
}
