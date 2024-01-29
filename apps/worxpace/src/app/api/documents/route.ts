import { NextResponse, type NextRequest } from "next/server";

import {
  fetchClient,
  fetchDocumentsByRole,
  parseBool,
  UnauthorizedError,
} from "~/lib";

export async function GET(req: NextRequest) {
  console.log(`searching in ${req.url}`);
  const params = req.nextUrl.searchParams;
  try {
    const client = fetchClient();
    const archived = parseBool(params.get("archived"));
    const documents = await fetchDocumentsByRole(client, archived);
    return NextResponse.json(documents);
  } catch (error) {
    if (error instanceof UnauthorizedError)
      return new NextResponse("Unauthorized", { status: 401 });
    return new NextResponse("Internal Service Error", { status: 500 });
  }
}
