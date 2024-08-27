"use server";

import { MutationFetcher } from "swr/mutation";

import { Membership } from "@acme/prisma";
import { DeleteMember, type DeleteMemberInput } from "@acme/validators";

import {
  createMutationFetcher,
  membership,
  SettingsPeopleKey,
  UnauthorizedError,
} from "~/lib";

const handler = createMutationFetcher(DeleteMember, async (_key, { arg }) => {
  try {
    return await membership.delete(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to delete member.");
  }
});

export const deleteMember: MutationFetcher<
  Membership,
  SettingsPeopleKey,
  DeleteMemberInput
> = ({ clerkId }, data) => handler(clerkId, data);
