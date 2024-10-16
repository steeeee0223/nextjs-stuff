"use server";

import type { MutationFetcher } from "swr/mutation";

import type { ENTITY_TYPE } from "@swy/prisma";
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
  type DetailedDocument,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  DeleteDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = await fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace)
        throw new CustomError("UNAUTHORIZED", "archiveDocument");
      const result = await documents.archive(arg);
      /** Activity Log */
      const type = result.item.type.toUpperCase() as ENTITY_TYPE;
      await auditLogs.create({
        entity: { title: result.item.title, entityId: arg.id, type },
        action: "DELETE",
        accountId: arg.accountId,
      });
      return result;
    } catch (error) {
      throw handleError(error, "Failed to archive document.");
    }
  },
);

export const archiveDocument: MutationFetcher<
  Modified<DetailedDocument>,
  DocumentsKey,
  DeleteDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
