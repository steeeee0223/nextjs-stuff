"use client";

import { redirect } from "next/navigation";

import { PageHeader } from "@swy/notion";

import { env } from "~/env";
import { useDocument, useEdgeStore, usePlatform } from "~/hooks";
import type { UpdateDocumentHandler } from "~/lib";
import Error from "../../error";
import Editor from "./_component/editor";

interface Params {
  params: { documentId: string };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const { accountId, workspaceId } = usePlatform();
  const { uploadFile } = useEdgeStore();
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
        return <Error error={error} />;
    }
  }
  return (
    <div className="pb-40">
      {isLoading || !document ? (
        <PageHeader.Skeleton />
      ) : (
        <>
          <PageHeader
            unsplashAPIKey={env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}
            onUpload={uploadFile}
          />
          <Editor document={document} onUpdate={onUpdate} />
        </>
      )}
    </div>
  );
};

export default DocumentPage;
