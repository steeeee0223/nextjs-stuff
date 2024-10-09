"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Membership } from "@swy/prisma";
import { JoinWorkspace, type JoinWorkspaceInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  membership,
  UnauthorizedError,
  type StrictedInvitationKey,
} from "~/lib";

const handler = createMutationFetcher(
  JoinWorkspace,
  async (clerkId, { arg }) => {
    try {
      const acc = await account.byClerkId(clerkId);
      if (acc?.clerkId !== clerkId) throw new Error();

      return await membership.create(arg);
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new Error("Failed to join workspace.");
    }
  },
);

export const joinWorkspace: MutationFetcher<
  Membership,
  StrictedInvitationKey,
  JoinWorkspaceInput
> = ({ clerkId }, data) => handler(clerkId, data);
