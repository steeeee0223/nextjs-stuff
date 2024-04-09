"use client";

import { redirect } from "next/navigation";

import { DocHeaderSkeleton } from "~/components";
import { usePage } from "~/hooks";
import Error from "../../error";
import Canvas from "./_components/canvas";

interface Params {
  params: { whiteboardId: string };
}

const WhiteboardPage = ({ params: { whiteboardId } }: Params) => {
  const { page: board, isLoading, error } = usePage(whiteboardId, false);

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
