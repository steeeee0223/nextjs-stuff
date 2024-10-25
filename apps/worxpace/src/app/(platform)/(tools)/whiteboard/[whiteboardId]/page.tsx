"use client";

import { redirect } from "next/navigation";

import { PageHeader } from "@swy/notion";

import { useDocument, usePlatform } from "~/hooks";
import { type UpdateDocumentHandler } from "~/lib";
import Error from "../../error";
import Canvas from "./_components/canvas";

interface Params {
  params: { whiteboardId: string };
}

const WhiteboardPage = ({ params: { whiteboardId } }: Params) => {
  const { accountId, workspaceId } = usePlatform();
  const {
    page: board,
    isLoading,
    error,
    update,
  } = useDocument({ documentId: whiteboardId, preview: false });
  const onUpdate: UpdateDocumentHandler = async (data) => {
    await update({ accountId, workspaceId, ...data });
  };

  if (error) {
    switch (error.message) {
      case "Unauthorized":
        return redirect("/select-role");
      default:
        return <Error error={error} />;
    }
  }
  return (
    <div>
      {isLoading || !board ? (
        <PageHeader.Skeleton />
      ) : (
        <Canvas board={board} onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default WhiteboardPage;
