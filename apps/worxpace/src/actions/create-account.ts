"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Account } from "@swy/prisma";
import { CreateAccount, type CreateAccountInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  handleError,
  type SettingsKey,
} from "~/lib";

const handler = createMutationFetcher(CreateAccount, async (_key, { arg }) => {
  try {
    return await account.createIfNotExist(arg);
  } catch (error) {
    throw handleError(error, "Failed to create account.");
  }
});

export const createAccount: MutationFetcher<
  Account,
  Omit<SettingsKey, "workspaceId">,
  CreateAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
