"use server";

import { worxpace as db, WORKSPACE_ROLE } from "@acme/prisma";
import type { Membership, Workspace } from "@acme/prisma";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "@acme/validators";

export type WorkspaceMemberships = Workspace & { memberships: Membership[] };

/**
 * Create Workspace
 *
 * 1. Create a workspace
 * 2. Create a membership of the created account
 * @returns
 */
const create = async (data: CreateWorkspaceInput): Promise<Workspace> =>
  await db.workspace.create({
    data: {
      ...data,
      domain: data.name,
      memberships: {
        create: {
          role: WORKSPACE_ROLE.OWNER,
          joinedAt: new Date(),
          account: { connect: { id: data.createdBy } },
        },
      },
    },
  });

const get = async (workspaceId: string): Promise<WorkspaceMemberships | null> =>
  await db.workspace.findUnique({
    where: { id: workspaceId },
    include: { memberships: true },
  });

/**
 * Delete Workspace
 *
 * 1. Delete all memberships in this workspcae
 * 2. Delete the workspace
 * @returns the deleted workspace
 */
const remove = async (workspaceId: string): Promise<Workspace> => {
  await db.membership.deleteMany({ where: { workspaceId } });
  return await db.workspace.delete({ where: { id: workspaceId } });
};

const update = async (
  workspaceId: string,
  data?: UpdateWorkspaceInput,
): Promise<Workspace> =>
  await db.workspace.update({ where: { id: workspaceId }, data: { ...data } });

export { create, get, update, remove as delete };
