"use server";

import { worxpace as db } from "@swy/prisma";
import type { Invitation, WORKSPACE_ROLE } from "@swy/prisma";
import type { CreateInvitationInput } from "@swy/validators";

const create = async ({
  role,
  clerkInviteId,
  ...byWorkspaceEmail
}: CreateInvitationInput): Promise<Invitation> => {
  const payload = { clerkInviteId, role: role.toUpperCase() as WORKSPACE_ROLE };
  return await db.invitation.upsert({
    where: { byWorkspaceEmail },
    create: { ...byWorkspaceEmail, ...payload },
    update: payload,
  });
};

const get = async (
  byWorkspaceEmail: Pick<Invitation, "workspaceId" | "email">,
): Promise<Invitation | null> =>
  await db.invitation.findUnique({ where: { byWorkspaceEmail } });

const revoke = async (id: string) => {
  await db.invitation.delete({ where: { id } });
};

export { create, get, revoke };
