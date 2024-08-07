"use server";

import { worxpace as db } from "@acme/prisma";
import type { Account, Membership, Workspace } from "@acme/prisma";
import type {
  CreateAccountInput,
  DeleteAccountInput,
  UpdateAccountInput,
} from "@acme/validators";

type WorkspaceMembership = Membership & {
  workspace: Workspace;
};
export type AccountMemberships = Account & {
  memberships: WorkspaceMembership[];
};

const create = async (data: CreateAccountInput): Promise<Account> =>
  await db.account.create({
    data: { ...data, preferredName: data.name, hasPassword: false },
  });

const get = async (clerkId: string): Promise<AccountMemberships | null> =>
  await db.account.findUnique({
    where: { clerkId },
    include: { memberships: { include: { workspace: true } } },
  });

const isInWorkspace = async ({
  clerkId,
  workspaceId,
}: {
  clerkId: string;
  workspaceId: string;
}): Promise<boolean> => {
  const account = await get(clerkId);
  if (!account) return false;
  const membership = await db.membership.findUnique({
    where: { accountId_workspaceId: { accountId: account.id, workspaceId } },
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

export { create, get, isInWorkspace, joinWorkspace, update, remove as delete };
