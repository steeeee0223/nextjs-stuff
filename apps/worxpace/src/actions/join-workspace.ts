"use server";

import { ClerkAPIResponseError } from "@clerk/shared";
import type { MutationFetcher } from "swr/mutation";

import type { Membership } from "@swy/prisma";
import { JoinWorkspace, type JoinWorkspaceInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  invitation,
  membership,
  UnauthorizedError,
  type StrictedInvitationKey,
} from "~/lib";

const handler = createMutationFetcher(
  JoinWorkspace,
  async (clerkId, { arg }) => {
    try {
      const { withClerkTicket, accountId, workspaceId } = arg;
      const acc = await account.byClerkId(clerkId);
      if (acc?.clerkId !== clerkId) throw new Error("Account not match");

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
      if (!inviteData) throw new Error("Not Found", { cause: "db.invitation" });

      return await membership.create({
        accountId,
        workspaceId,
        role: inviteData.role,
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      if (error instanceof ClerkAPIResponseError) {
        console.log(`[${error.status}] ${error.name} - ${error.message}`);
      }
      if (error instanceof Error) {
        console.log(`[joinWorkspace] ${error.name} - ${error.message}`);
      }
      throw new Error("Failed to join workspace.");
    }
  },
);

export const joinWorkspace: MutationFetcher<
  Membership,
  StrictedInvitationKey,
  JoinWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
