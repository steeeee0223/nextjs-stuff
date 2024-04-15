"use server";

import { revalidatePath } from "next/cache";

import { ENTITY_TYPE, type Document } from "@acme/prisma";
import { CreateDocument, type CreateDocumentInput } from "@acme/validators";

import {
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  generateDefaultIcon,
  toIcon,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CreateDocumentInput, Document> = async (
  _key,
  { arg },
) => {
  try {
    const { userId, orgId, path } = fetchClient();
    const icon = toIcon(generateDefaultIcon(arg.type));
    const result = await documents.create({ ...arg, icon, userId, orgId });
    /** Activity Log */
    const type = result.type.toUpperCase() as ENTITY_TYPE;
    await auditLogs.create(
      { title: result.title, entityId: result.id, type },
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
