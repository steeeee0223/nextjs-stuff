"use server";

import type { MutationFetcher } from "swr/mutation";

import type { AccountStore } from "@acme/ui/notion";
import { UpdateAccount, type UpdateAccountInput } from "@acme/validators";

import {
  account,
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<UpdateAccountInput, AccountStore> = async (
  userId,
  { arg },
) => {
  try {
    fetchClient();
    const { avatarUrl, email, preferredName, hasPassword } =
      await account.update(userId, arg);
    return { avatarUrl, email, preferredName, hasPassword };
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update account.");
  }
};

const update = createMutationFetcher(UpdateAccount, handler);

export const updateAccount: MutationFetcher<
  AccountStore,
  { type: "settings"; userId: string; workspaceId: string },
  UpdateAccountInput
> = ({ userId }, data) => update(userId, data);
