/* eslint-disable no-var */
import { PrismaClient as Auth } from ".prisma/client/auth";
import { PrismaClient as Worxpace } from ".prisma/client/worxpace";

declare global {
  var authClient: Auth | undefined;
  var worxpaceClient: Worxpace | undefined;
}

/** Schemas */
export const auth = globalThis.authClient ?? new Auth();
export const worxpace = globalThis.worxpaceClient ?? new Worxpace();

if (process.env.NODE_ENV !== "production") {
  globalThis.authClient = auth;
  globalThis.worxpaceClient = worxpace;
}

export type {
  Document,
  Account,
  AuditLog,
  Entity,
  Card,
  CoverImage,
  Icon,
  Limitation,
  List,
  Membership,
  Subscription,
  Workspace,
} from ".prisma/client/worxpace";
export {
  ROLE,
  ACTION,
  ENTITY_TYPE,
  WORKSPACE_ROLE,
  PLAN,
} from ".prisma/client/worxpace";
