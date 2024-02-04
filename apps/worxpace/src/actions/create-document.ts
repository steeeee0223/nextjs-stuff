"use server";

import { revalidatePath } from "next/cache";

import { type Document } from "@acme/prisma";
import { createSafeAction, type ActionHandler } from "@acme/ui/lib";
import { CreateDocument, type CreateDocumentInput } from "@acme/validators";

import {
  createAuditLog,
  documents,
  fetchClient,
  UnauthorizedError,
} from "~/lib";

const handler: ActionHandler<CreateDocumentInput, Document> = async (data) => {
  let result;

  try {
    const { userId, orgId, path } = fetchClient();
    result = await documents.create({ ...data, userId, orgId });
    /** Activity Log */
    await createAuditLog(
      { title: result.title, entityId: result.id, type: "DOCUMENT" },
      "CREATE",
    );
    revalidatePath(path);
  } catch (error) {
    if (error instanceof UnauthorizedError) return { error: "Unauthorized" };
    console.log(`ERROR`, error);
    return { error: "Failed to create document." };
  }

  return { data: result };
};

export const createDocument = createSafeAction(CreateDocument, handler);
