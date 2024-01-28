"use server";

import { revalidatePath } from "next/cache";

import type { Document } from "@acme/prisma";
import {
  createSafeAction,
  type ActionHandler,
  type Modified,
} from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import { archive, createAuditLog, fetchClient, UnauthorizedError } from "~/lib";

const handler: ActionHandler<DeleteDocumentInput, Modified<Document>> = async (
  data,
) => {
  let result;

  try {
    const { userId, orgId } = fetchClient();
    result = await archive({ ...data, userId, orgId });
    /** Activity Log */
    await createAuditLog(
      { title: result.item.title, entityId: data.id, type: "DOCUMENT" },
      "DELETE",
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) return { error: "Unauthorized" };
    console.log(`ERROR`, error);
    return { error: "Failed to archive document." };
  }

  revalidatePath(`/documents/${data.id}`);
  return { data: result };
};

export const archiveDocument = createSafeAction(DeleteDocument, handler);