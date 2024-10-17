"use server";

import { worxpace as db } from "@swy/prisma";
import type { Account, Membership, WORKSPACE_ROLE } from "@swy/prisma";
import type {
  DeleteMemberInput,
  JoinWorkspaceInput,
  UpdateMemberInput,
} from "@swy/validators";

const create = async (
  data: Omit<JoinWorkspaceInput, "clerkTicket"> & { role: WORKSPACE_ROLE },
): Promise<Membership> => await db.membership.create({ data });

const createMany = async ({
  workspaceId,
  accountIds,
  role,
}: {
  workspaceId: string;
  accountIds: string[];
  role: Lowercase<WORKSPACE_ROLE>;
}) =>
  await db.membership.createMany({
    data: accountIds.map((accountId) => ({
      workspaceId,
      accountId,
      role: role.toUpperCase() as WORKSPACE_ROLE,
    })),
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

export { create, createMany, get, update, remove as delete };
