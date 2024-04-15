"use server";

import { revalidatePath } from "next/cache";

import type { Document, ENTITY_TYPE } from "@acme/prisma";
import { type Modified } from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import {
  auditLogs,
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
    const { userId, orgId } = fetchClient();
    const result = await documents.restore({ ...arg, userId, orgId });
    /** Activity Log */
    const type = result.item.type.toUpperCase() as ENTITY_TYPE;
    await auditLogs.create(
      { title: result.item.title, entityId: arg.id, type },
      "RESTORE",
    );
    revalidatePath(`/documents/${arg.id}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to archive document.");
  }
};

export const restoreDocument = createMutationFetcher(DeleteDocument, handler);
