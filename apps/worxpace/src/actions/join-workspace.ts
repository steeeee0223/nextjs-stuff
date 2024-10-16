"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Membership } from "@swy/prisma";
import { JoinWorkspace, type JoinWorkspaceInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  CustomError,
  handleError,
  invitation,
  membership,
  type StrictedInvitationKey,
} from "~/lib";

const handler = createMutationFetcher(
  JoinWorkspace,
  async (clerkId, { arg }) => {
    try {
      const { withClerkTicket, accountId, workspaceId } = arg;
      const acc = await account.byClerkId(clerkId);
      if (acc?.clerkId !== clerkId)
        throw new CustomError("UNEXPECTED", "`clerkId` not matched");

      if (!withClerkTicket)
        return await membership.create({
          accountId,
          workspaceId,
          role: "GUEST",
        });

      const inviteData = await invitation.get({
        workspaceId,
        email: acc.email,
      });
      if (!inviteData) throw new CustomError("NOT_FOUND", "db.invitation");

      return await membership.create({
        accountId,
        workspaceId,
        role: inviteData.role,
      });
    } catch (error) {
      throw handleError(error, "Failed to join workspace.");
    }
  },
);

export const joinWorkspace: MutationFetcher<
  Membership,
  StrictedInvitationKey,
  JoinWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
