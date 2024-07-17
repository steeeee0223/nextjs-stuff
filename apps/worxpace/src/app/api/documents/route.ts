import { NextResponse, type NextRequest } from "next/server";

import { account, documents as db, fetchClient, parseBool } from "~/lib";

export async function GET(req: NextRequest) {
  console.log(`searching in ${req.url}`);
  const params = req.nextUrl.searchParams;
  const isArchived = parseBool(params.get("archived"));
  const workspaceId = params.get("workspaceId");
  if (typeof workspaceId !== "string")
    return new NextResponse("Invalid Params", { status: 422 });
  try {
    const { clerkId } = fetchClient();
    const result = await account.isInWorkspace({ clerkId, workspaceId });
    if (!result) return new NextResponse("Unauthorized", { status: 401 });
    const documents = await db.getByWorkspace({ workspaceId, isArchived });
    return NextResponse.json(documents);
  } catch (e) {
    return new NextResponse("Internal Service Error", { status: 500 });
  }
}
