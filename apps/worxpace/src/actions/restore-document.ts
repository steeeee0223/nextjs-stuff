"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { ENTITY_TYPE } from "@acme/prisma";
import { type Modified } from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type DetailedDocument,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace) throw new UnauthorizedError();
      const result = await documents.restore(arg);
      /** Activity Log */
      const type = result.item.type.toUpperCase() as ENTITY_TYPE;
      await auditLogs.create({
        entity: { title: result.item.title, entityId: arg.id, type },
        action: "RESTORE",
        accountId: arg.accountId,
      });
      revalidatePath(`/documents/${arg.id}`);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to archive document.");
    }
  },
);

export const restoreDocument: MutationFetcher<
  Modified<DetailedDocument>,
  DocumentsKey,
  DeleteDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
