"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Document } from "@acme/prisma";
import { type Modified } from "@acme/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@acme/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  UnauthorizedError,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = await fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace) throw new UnauthorizedError();
      const result = await documents.remove(arg);
      /** Activity Log */
      await auditLogs.remove(arg.id);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to archive document.");
    }
  },
);

export const deleteDocument: MutationFetcher<
  Modified<Document>,
  DocumentsKey,
  DeleteDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
