/* eslint-disable no-var */
import { PrismaClient as Auth } from ".prisma/auth";
import { PrismaClient as Worxpace } from ".prisma/worxpace";

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

export type {
  Document,
  AuditLog,
  Entity,
  Board,
  Card,
  Image,
  Limitation,
  List,
  Subscription,
  User,
} from "../.generated/worxpace";
export { ROLE, ACTION, ENTITY_TYPE } from "../.generated/worxpace";
