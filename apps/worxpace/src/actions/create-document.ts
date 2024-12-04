"use server";

import type { MutationFetcher } from "swr/mutation";

import { generateDefaultIcon } from "@swy/notion";
import type { Document, ENTITY_TYPE } from "@swy/prisma";
import { CreateDocument, type CreateDocumentInput } from "@swy/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  toIcon,
  UnauthorizedError,
  type DocumentsKey,
} from "~/lib";

const handler = createMutationFetcher(
  CreateDocument,
  async (workspaceId, { arg }) => {
    try {
      const { clerkId } = await fetchClient();
      const inWorkspace = await account.isInWorkspace({ clerkId, workspaceId });
      if (!inWorkspace) throw new UnauthorizedError();
      const icon = toIcon(generateDefaultIcon(arg.type));
      const result = await documents.create({ ...arg, icon });
      /** Activity Log */
      const type = result.type.toUpperCase() as ENTITY_TYPE;
      await auditLogs.create({
        entity: { title: result.title, entityId: result.id, type },
        action: "CREATE",
        accountId: arg.accountId,
      });
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to create document.");
    }
  },
);

export const createDocument: MutationFetcher<
  Document,
  DocumentsKey,
  CreateDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
