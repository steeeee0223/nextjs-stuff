"use server";

import { clerkClient } from "@clerk/nextjs/server";
import type { MutationFetcher } from "swr/mutation";

import type { Account } from "@swy/prisma";
import { DeleteAccount, type DeleteAccountInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  CustomError,
  fetchClient,
  handleError,
} from "~/lib";

const handler = createMutationFetcher(DeleteAccount, async (_key, { arg }) => {
  try {
    const cli = await fetchClient();
    if (arg.clerkId !== cli.clerkId)
      throw new CustomError("UNEXPECTED", "`clerkId` not matched");

    const result = await account.delete(arg);

    const user = await clerkClient.users.deleteUser(arg.clerkId);
    console.log(`[clerk] deleted user`, user);

    return result;
  } catch (error) {
    throw handleError(error, "Failed to delete account.");
  }
});

export const deleteAccount: MutationFetcher<
  Account,
  { type: "settings"; clerkId: string },
  DeleteAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
