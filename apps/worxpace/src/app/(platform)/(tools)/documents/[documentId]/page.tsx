"use client";

import { redirect } from "next/navigation";
import useSWR from "swr";

import type { Document } from "@acme/prisma";

import { getDocument } from "~/app/(platform)/_functions";
import Error from "../../error";
import Toolbar, { ToolbarSkeleton } from "./_component/toolbar";

interface Params {
  params: { documentId: string };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  const {
    data: document,
    isLoading,
    error,
  } = useSWR<Document, Error>([documentId, false], getDocument, {
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
    <div className="pb-40">
      {isLoading || !document ? (
        <ToolbarSkeleton />
      ) : (
        <Toolbar document={document} />
      )}
    </div>
  );
};

export default DocumentPage;
