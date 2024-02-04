"use server";

import type { Document } from "@acme/prisma";
import type { ActionState } from "@acme/ui/lib";

import { documents, fetchClient } from "~/lib";

export const getDocument = async (
  documentId: string,
  preview = false,
): Promise<ActionState<never, Document>> => {
  try {
    const document = await documents.getById(documentId);
    if (!document) return { error: "notFound" };
    // Published & not archived
    if (document.isPublished && !document.isArchived) return { data: document };
    // Preview, but either archived or not published
    if (preview) return { error: "notFound" };
    // Verify user if not preview
    const { userId, orgId } = fetchClient();
    if (document.userId !== userId || document.orgId !== orgId)
      return { error: "unauthorized" };
    // Return authorized doc
    return { data: document };
  } catch {
    return { error: "internal server error" };
  }
};
