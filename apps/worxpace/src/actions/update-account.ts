"use server";

import type { MutationFetcher } from "swr/mutation";

import type { AccountStore } from "@swy/ui/notion";
import { UpdateAccount, type UpdateAccountInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  fetchClient,
  handleError,
} from "~/lib";

const handler = createMutationFetcher(
  UpdateAccount,
  async (clerkId, { arg }) => {
    try {
      await fetchClient();
      const { id, name, avatarUrl, email, preferredName, hasPassword } =
        await account.update(clerkId, arg);
      return { id, name, avatarUrl, email, preferredName, hasPassword };
    } catch (error) {
      throw handleError(error, "Failed to update account.");
    }
  },
);

export const updateAccount: MutationFetcher<
  AccountStore,
  { type: "settings"; clerkId: string; workspaceId: string },
  UpdateAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
