"use server";

import { worxpace as db, WORKSPACE_ROLE } from "@acme/prisma";
import type { Account, Membership } from "@acme/prisma";
import type { DeleteMemberInput, UpdateMemberInput } from "@acme/validators";

const createMany = async ({
  workspaceId,
  accountIds,
  role,
}: {
  workspaceId: string;
  accountIds: string[];
  role: Membership["role"];
}) =>
  await db.membership.createMany({
    data: accountIds.map((accountId) => ({ workspaceId, accountId, role })),
  });

const get = async (
  workspaceId: string,
): Promise<(Membership & { account: Account })[]> =>
  await db.membership.findMany({
    where: { workspaceId },
    include: { account: true },
  });

const remove = async (ids: DeleteMemberInput): Promise<Membership> =>
  await db.membership.delete({
    where: { accountId_workspaceId: ids },
  });

const update = async ({
  role,
  ...ids
}: UpdateMemberInput): Promise<Membership> =>
  await db.membership.update({
    where: { accountId_workspaceId: ids },
    data: { role: role.toUpperCase() as WORKSPACE_ROLE },
  });

export { createMany, get, update, remove as delete };
