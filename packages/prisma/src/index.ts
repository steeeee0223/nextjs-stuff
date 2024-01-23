/* eslint-disable no-var */
import { PrismaClient as Auth } from "../.generated/auth";
import { PrismaClient as Worxpace } from "../.generated/worxpace";

declare global {
  var authClient: Auth | undefined;
  var worxpaceClient: Worxpace | undefined;
}

export * from "@prisma/client";

/** Schemas */
export const auth = globalThis.authClient ?? new Auth();
export const worxpace = globalThis.worxpaceClient ?? new Worxpace();

if (process.env.NODE_ENV !== "production") {
  globalThis.authClient = auth;
  globalThis.worxpaceClient = worxpace;
}
