"use server";

import { revalidatePath } from "next/cache";

import type { Document } from "@acme/prisma";
import { type Modified } from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<DeleteDocumentInput, Modified<Document>> = async (
  _key,
  { arg },
) => {
  try {
    const { userId, orgId, path } = fetchClient();
    const result = await documents.remove({ userId, orgId, ...arg });
    /** Activity Log */
    await createAuditLog(
      {
        title: result.item.title,
        entityId: arg.id,
        type: "DOCUMENT",
      },
      "DELETE",
    );
    revalidatePath(path);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to archive document.");
  }
};

export const deleteDocument = createMutationFetcher(DeleteDocument, handler);
