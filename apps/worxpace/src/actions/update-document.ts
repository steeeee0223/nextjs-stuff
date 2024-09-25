"use server";

import type { MutationFetcher } from "swr/mutation";

import type { ENTITY_TYPE } from "@swy/prisma";
import { UpdateDocument, type UpdateDocumentInput } from "@swy/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type DetailedDocument,
  type DocumentKey,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(UpdateDocument, async (_key, { arg }) => {
  const { log, id, ...updateData } = arg;
  try {
    const { clerkId } = await fetchClient();
    const inWorkspace = await account.isInWorkspace({
      clerkId,
      workspaceId: arg.workspaceId,
    });
    if (!inWorkspace) throw new UnauthorizedError();
    const result = await documents.update({ id, ...updateData });
    /** Activity Log */
    if (log) {
      const type = result.type.toUpperCase() as ENTITY_TYPE;
      await auditLogs.create({
        entity: { type, entityId: id, title: result.title },
        action: "UPDATE",
        accountId: arg.accountId,
      });
    }
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to archive document.");
  }
});

export const updateDocument: MutationFetcher<
  DetailedDocument,
  DocumentsKey,
  UpdateDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
export const updateInternalDocument: MutationFetcher<
  DetailedDocument,
  DocumentKey,
  UpdateDocumentInput
> = ({ documentId }, data) => handler(documentId, data);
