"use server";

import { worxpace as db } from "@acme/prisma";
import type { Account, Membership } from "@acme/prisma";
import type {
  CreateAccountInput,
  DeleteAccountInput,
  UpdateAccountInput,
} from "@acme/validators";

export type AccountMemberships = Account & { memberships: Membership[] };

const create = async (data: CreateAccountInput): Promise<Account> =>
  await db.account.create({
    data: { ...data, preferredName: data.name, hasPassword: false },
  });

const get = async (clerkId: string): Promise<AccountMemberships | null> =>
  await db.account.findUnique({
    where: { clerkId },
    include: { memberships: true },
  });

const isInWorkspace = async (
  data: Pick<Membership, "accountId" | "workspaceId">,
): Promise<boolean> => {
  const membership = await db.membership.findUnique({
    where: { accountId_workspaceId: data },
  });
  return !!membership;
};

const joinWorkspace = async ({
  role,
  accountId,
  workspaceId,
}: Pick<
  Membership,
  "role" | "accountId" | "workspaceId"
>): Promise<Membership> =>
  await db.membership.create({
    data: {
      role,
      account: { connect: { id: accountId } },
      workspace: { connect: { id: workspaceId } },
    },
  });

/**
 * Delete Account
 *
 * 1. Delete all workspaces created by the account
 * 2. Delete all memberships of the account
 * 3. Delete the account
 * @returns the deleted account
 */
const remove = async (data: DeleteAccountInput): Promise<Account> => {
  await db.workspace.deleteMany({ where: { createdBy: data.id } });
  await db.membership.deleteMany({ where: { accountId: data.id } });
  return await db.account.delete({ where: data });
};

const update = async (
  accountId: string,
  data?: UpdateAccountInput,
): Promise<Account> =>
  await db.account.update({ where: { id: accountId }, data: { ...data } });

export { create, get, isInWorkspace, joinWorkspace, update, remove as delete };
