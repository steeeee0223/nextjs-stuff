"use server";

import type { Account } from "@acme/prisma";
import { DeleteAccount, type DeleteAccountInput } from "@acme/validators";

import {
  account,
  createMutationFetcher,
  fetchClient,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<DeleteAccountInput, Account> = async (_key, { arg }) => {
  try {
    const cli = fetchClient();
    const clerkId = cli.role === "personal" ? cli.userId : cli.orgId;
    if (arg.clerkId !== clerkId) throw new Error("Account not match.");

    return await account.delete(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete account.");
  }
};

export const deleteAccount = createMutationFetcher(DeleteAccount, handler);
