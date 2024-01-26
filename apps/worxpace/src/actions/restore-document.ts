"use server";

import { revalidatePath } from "next/cache";

import type { Document } from "@acme/prisma";
import {
  createSafeAction,
  type ActionHandler,
  type Modified,
} from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import { createAuditLog, fetchClient, restore, UnauthorizedError } from "~/lib";

const handler: ActionHandler<DeleteDocumentInput, Modified<Document>> = async (
  data,
) => {
  let result;

  try {
    const { userId, orgId } = fetchClient();
    result = await restore({ ...data, userId, orgId });
    /** Activity Log */
    await createAuditLog(
      {
        title: result.item.title,
        entityId: data.id,
        type: "DOCUMENT",
      },
      "UPDATE",
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) return { error: "Unauthorized" };
    console.log(`ERROR`, error);
    return { error: "Failed to restore document." };
  }

  revalidatePath(`/documents/${data.id}`);
  return { data: result };
};

export const restoreDocument = createSafeAction(DeleteDocument, handler);
