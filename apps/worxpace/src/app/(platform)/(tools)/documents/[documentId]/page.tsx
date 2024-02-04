import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

import { getDocument } from "~/app/(platform)/_functions";
import Error from "../../error";
import Toolbar, { ToolbarSkeleton } from "./_component/toolbar";

interface Params {
  params: { documentId: string };
}

const DocumentPage = async ({ params: { documentId } }: Params) => {
  const { data: document, error } = await getDocument(documentId, false);

  if (!document) {
    switch (error) {
      case "notFound":
        return notFound();
      case "unauthorized":
        return redirect("/select-role");
      default:
        return <Error />;
    }
  }
  return (
    <div className="pb-40">
      <Suspense fallback={<ToolbarSkeleton />}>
        <Toolbar document={document} />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
