"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { ENTITY_TYPE } from "@acme/prisma";
import { CreateDocument, type CreateDocumentInput } from "@acme/validators";

import {
  account,
  auditLogs,
  createMutationFetcher,
  documents,
  fetchClient,
  generateDefaultIcon,
  toIcon,
  UnauthorizedError,
  type DetailedDocument,
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
      revalidatePath(`/workspace/${workspaceId}`);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to create document.");
    }
  },
);

export const createDocument: MutationFetcher<
  DetailedDocument,
  DocumentsKey,
  CreateDocumentInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
