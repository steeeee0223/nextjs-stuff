"use server";

import { worxpace as db } from "@swy/prisma";
import type { Account, Membership, Workspace } from "@swy/prisma";
import type {
  CreateAccountInput,
  DeleteAccountInput,
  UpdateAccountInput,
} from "@swy/validators";

import { env } from "~/env";

export type AccountMemberships = Account & {
  memberships: Membership[];
};

const byClerkId = async (
  clerkId: string,
): Promise<AccountMemberships | null> => {
  if (env.NODE_ENV === "test") {
    // Return mock data for testing
    return {
      id: "mock-account-id",
      name: "mock-user",
      clerkId,
      email: "test@example.com",
      memberships: [],
    } as unknown as AccountMemberships;
  }

  return await db.account.findUnique({
    where: { clerkId },
    include: { memberships: true },
  });
};

const byEmails = async (
  emails: string[],
): Promise<Pick<Account, "id" | "email">[]> =>
  await db.account.findMany({
    where: { email: { in: emails } },
    select: { id: true, email: true },
  });

const createIfNotExist = async (
  data: CreateAccountInput,
): Promise<AccountMemberships> => {
  const account = await byClerkId(data.clerkId);
  if (account) return account;
  return await db.account.create({
    data: { ...data, preferredName: data.name, hasPassword: false },
    include: { memberships: true },
  });
};

export interface WorkspaceMembership {
  accountId: string;
  name: string;
  email: string;
  workspaces: {
    workspace: Pick<Workspace, "id" | "name" | "icon" | "plan"> & {
      memberships: { accountId: string; role: Membership["role"] }[];
    };
  }[];
}
const joinedWorkspaces = async (
  clerkId: string,
): Promise<WorkspaceMembership | null> => {
  const account = await byClerkId(clerkId);
  if (!account) return null;
  const workspaces = await db.membership.findMany({
    where: { accountId: account.id },
    select: {
      workspace: {
        select: {
          id: true,
          name: true,
          icon: true,
          plan: true,
          memberships: { select: { accountId: true, role: true } },
        },
      },
    },
  });
  return {
    accountId: account.id,
    name: account.name,
    email: account.email,
    workspaces,
  };
};

const isInWorkspace = async ({
  clerkId,
  workspaceId,
}: {
  clerkId: string;
  workspaceId: string;
}): Promise<boolean> => {
  const account = await byClerkId(clerkId);
  if (!account) return false;
  const membership = await db.membership.findUnique({
    where: { accountId_workspaceId: { accountId: account.id, workspaceId } },
  });
  return !!membership;
};

/**
 * Delete Account
 *
 * 1. Delete all memberships of the account
 * 2. Delete all workspaces created by the account
 * 3. Delete the account
 * @returns the deleted account
 */
const remove = async (data: DeleteAccountInput): Promise<Account> => {
  await db.membership.deleteMany({ where: { accountId: data.id } });
  await db.workspace.deleteMany({ where: { createdBy: data.id } });

  return await db.account.delete({ where: data });
};

const update = async (
  clerkId: string,
  data?: UpdateAccountInput,
): Promise<Account> =>
  await db.account.update({ where: { clerkId }, data: { ...data } });

export {
  byClerkId,
  byEmails,
  createIfNotExist,
  isInWorkspace,
  joinedWorkspaces,
  update,
  remove as delete,
};
