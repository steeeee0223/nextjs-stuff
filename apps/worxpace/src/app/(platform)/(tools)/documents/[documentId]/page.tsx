import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

import { documents, fetchClient } from "~/lib";
import Toolbar, { ToolbarSkeleton } from "./_component/toolbar";

interface Params {
  params: { documentId: string };
}

const getDocumentPage = async (documentId: string) => {
  const document = await documents.getById(documentId);
  if (document === null) return notFound();
  if (document.isPublished && !document.isArchived) return document;
  const { userId, orgId } = fetchClient();
  if (document.userId !== userId || document.orgId !== orgId)
    redirect(`/select-role`);
  return document;
};

const DocumentPage = async ({ params: { documentId } }: Params) => {
  const document = await getDocumentPage(documentId);

  return (
    <div className="pb-40">
      <Suspense fallback={<ToolbarSkeleton />}>
        <Toolbar document={document} />
      </Suspense>
    </div>
  );
};

export default DocumentPage;
