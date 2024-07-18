"use server";

import { revalidatePath } from "next/cache";
import type { MutationFetcher } from "swr/mutation";

import type { WorkspaceStore } from "@acme/ui/notion";
import { UpdateWorkspace, type UpdateWorkspaceInput } from "@acme/validators";

import {
  createMutationFetcher,
  fetchClient,
  toIconInfo,
  UnauthorizedError,
  workspace,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateWorkspace,
  async (workspaceId, { arg }) => {
    try {
      fetchClient();
      const { id, name, icon, domain } = await workspace.update(
        workspaceId,
        arg,
      );
      revalidatePath(`/workspace/${id}`);
      return { id, name, icon: toIconInfo(icon), domain };
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to update workspace.");
    }
  },
);

export const updateWorkspace: MutationFetcher<
  WorkspaceStore,
  { type: "settings"; clerkId: string; workspaceId: string },
  UpdateWorkspaceInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
