"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { Document } from "@acme/prisma";
import { UpdateDocument, type UpdateDocumentInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateDocumentInput, Document> = async (
  _key,
  { arg },
) => {
  const { log, id, ...updateData } = arg;
  try {
    const { userId, orgId } = fetchClient();
    const result = await documents.update({ userId, orgId, id, ...updateData });
    /** Activity Log */
    if (log)
      await createAuditLog(
        { type: "DOCUMENT", entityId: id, title: result.title },
        "UPDATE",
      );
    revalidatePath(`/documents/${arg.id}`);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to archive document.");
  }
};

export const updateDocument = createMutationFetcher(UpdateDocument, handler);
export const updateInternalDocument: MutationFetcher<
  Document,
  [string, boolean],
  UpdateDocumentInput
> = ([key], data) => updateDocument(key, data);
