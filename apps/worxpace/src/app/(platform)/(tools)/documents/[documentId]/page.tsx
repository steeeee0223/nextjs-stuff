"use client";

import { redirect } from "next/navigation";

import { DocHeader, DocHeaderSkeleton } from "~/components";
import { useDocument, usePlatform } from "~/hooks";
import { UpdateDocumentHandler } from "~/lib";
import Error from "../../error";
import Editor from "./_component/editor";

interface Params {
  params: { documentId: string };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const { accountId, workspaceId } = usePlatform();
  const {
    page: document,
    isLoading,
    error,
    update,
  } = useDocument({ documentId, preview: false });
  const onUpdate: UpdateDocumentHandler = async (data) => {
    await update({ accountId, workspaceId, ...data });
  };

  if (error) {
    switch (error.message) {
      case "Unauthorized":
        return redirect("/select-role");
      default:
        return <Error />;
    }
  }
  return (
    <div className="pb-40">
      {isLoading || !document ? (
        <DocHeaderSkeleton />
      ) : (
        <>
          <DocHeader document={document} onUpdate={onUpdate} />
          <Editor document={document} onUpdate={onUpdate} />
        </>
      )}
    </div>
  );
};

export default DocumentPage;
