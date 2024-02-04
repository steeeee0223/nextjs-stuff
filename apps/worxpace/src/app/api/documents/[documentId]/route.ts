import { NextResponse } from "next/server";

import { getDocument } from "~/app/(platform)/_functions";

interface Params {
  params: { documentId: string };
}

export async function GET(_req: Request, { params: { documentId } }: Params) {
  const { data, error } = await getDocument(documentId, false);
  if (data) return NextResponse.json({ data });
  switch (error) {
    case "notFound":
      return new NextResponse("Not Found", { status: 404 });
    case "unauthorized":
      return new NextResponse("Unauthorized", { status: 401 });
    default:
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}
