"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Account } from "@acme/prisma";
import { CreateAccount, type CreateAccountInput } from "@acme/validators";

import { account, createMutationFetcher, UnauthorizedError } from "~/lib";

const handler = createMutationFetcher(
  CreateAccount,
  async (clerkId, { arg }) => {
    try {
      const data = await account.get(clerkId);
      if (data) return data;
      return await account.create(arg);
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to create account.");
    }
  },
);

export const createAccount: MutationFetcher<
  Account,
  { type: "settings"; clerkId: string },
  CreateAccountInput
> = ({ clerkId }, data) => handler(clerkId, data);
