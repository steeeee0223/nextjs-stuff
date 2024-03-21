"use client";

import { redirect } from "next/navigation";
import useSWR from "swr";

import type { Document } from "@acme/prisma";

import { getDocument } from "~/app/(platform)/_functions";
import { DocHeaderSkeleton } from "~/components";
import Error from "../../error";
import Canvas from "./_components/canvas";

interface Params {
  params: { whiteboardId: string };
}

const WhiteboardPage = ({ params: { whiteboardId } }: Params) => {
  const {
    data: board,
    isLoading,
    error,
  } = useSWR<Document, Error>([whiteboardId, false], getDocument, {
    onError: (e, key) => console.log(`[swr] ${key}: ${e.message}`),
  });

  if (error) {
    switch (error.message) {
      case "Unauthorized":
        return redirect("/select-role");
      default:
        return <Error />;
    }
  }
  return (
    <div>
      <div className="h-12" />
      {isLoading || !board ? <DocHeaderSkeleton /> : <Canvas board={board} />}
    </div>
  );
};

export default WhiteboardPage;
