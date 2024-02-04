"use server";

import { revalidatePath } from "next/cache";

import type { Document } from "@acme/prisma";
import { createSafeAction, type ActionHandler } from "@acme/ui/lib";
import { UpdateDocument, type UpdateDocumentInput } from "@acme/validators";

import {
  createAuditLog,
  documents,
  fetchClient,
  UnauthorizedError,
} from "~/lib";

const handler: ActionHandler<UpdateDocumentInput, Document> = async (data) => {
  let result;
  const { log, id, ...updateData } = data;

  try {
    const { userId, orgId } = fetchClient();
    result = await documents.update({ userId, orgId, id, ...updateData });
    /** Activity Log */
    if (log)
      await createAuditLog(
        { type: "DOCUMENT", entityId: id, title: result.title },
        "UPDATE",
      );
  } catch (error) {
    if (error instanceof UnauthorizedError) return { error: "Unauthorized" };
    console.log(`ERROR`, error);
    return { error: "Failed to update document." };
  }

  revalidatePath(`/documents/${data.id}`);
  return { data: result };
};

export const updateDocument = createSafeAction(UpdateDocument, handler);
