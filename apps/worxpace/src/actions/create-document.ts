"use server";

import { revalidatePath } from "next/cache";

import { type Document } from "@acme/prisma";
import { CreateDocument, type CreateDocumentInput } from "@acme/validators";

import {
  createAuditLog,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CreateDocumentInput, Document> = async (
  _key,
  { arg },
) => {
  try {
    const { userId, orgId, path } = fetchClient();
    const result = await documents.create({ ...arg, userId, orgId });
    /** Activity Log */
    await createAuditLog(
      { title: result.title, entityId: result.id, type: "DOCUMENT" },
      "CREATE",
    );
    revalidatePath(path);
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to archive document.");
  }
};

export const createDocument = createMutationFetcher(CreateDocument, handler);
