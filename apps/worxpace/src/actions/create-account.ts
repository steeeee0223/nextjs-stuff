"use server";

import type { Account } from "@acme/prisma";
import { CreateAccount, type CreateAccountInput } from "@acme/validators";

import {
  account,
  createMutationFetcher,
  UnauthorizedError,
  type Action,
} from "~/lib";

const handler: Action<CreateAccountInput, Account> = async (_key, { arg }) => {
  try {
    return account.create(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to create account.");
  }
};

export const createAccount = createMutationFetcher(CreateAccount, handler);
