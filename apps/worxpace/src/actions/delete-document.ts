"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Document } from "@swy/prisma";
import { type Modified } from "@swy/ui/lib";
import { DeleteDocument, type DeleteDocumentInput } from "@swy/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  CustomError,
  documents,
  fetchClient,
  handleError,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = await fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace) throw new CustomError("UNAUTHORIZED", "deleteDocument");
      const result = await documents.remove(arg);
      /** Activity Log */
      await auditLogs.remove(arg.id);
      return result;
    } catch (error) {
      throw handleError(error, "Failed to delete document.");
    }
  },
);

export const deleteDocument: MutationFetcher<
  Modified<Document>,
  DocumentsKey,
  DeleteDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
