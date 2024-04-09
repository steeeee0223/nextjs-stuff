"use client";

import { redirect } from "next/navigation";

import { DocHeader, DocHeaderSkeleton } from "~/components";
import { usePage } from "~/hooks";
import Error from "../../error";
import Editor from "./_component/editor";

interface Params {
  params: { documentId: string };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const { page: document, isLoading, error } = usePage(documentId, false);

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
          <DocHeader document={document} />
          <Editor document={document} />
        </>
      )}
    </div>
  );
};

export default DocumentPage;
