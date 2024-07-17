"use server";

import type { MutationFetcher } from "swr/mutation";

import type { AccountStore } from "@acme/ui/notion";
import { UpdateAccount, type UpdateAccountInput } from "@acme/validators";

import {
  account,
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateAccount,
  async (clerkId, { arg }) => {
    try {
      fetchClient();
      const { id, name, avatarUrl, email, preferredName, hasPassword } =
        await account.update(clerkId, arg);
      return { id, name, avatarUrl, email, preferredName, hasPassword };
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to update account.");
    }
  },
);

export const updateAccount: MutationFetcher<
  AccountStore,
  { type: "settings"; clerkId: string; workspaceId: string },
  UpdateAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
