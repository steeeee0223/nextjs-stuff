"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Membership } from "@acme/prisma";
import { UpdateMember, type UpdateMemberInput } from "@acme/validators";

import {
  createMutationFetcher,
  membership,
  SettingsPeopleKey,
  UnauthorizedError,
} from "~/lib";

const handler = createMutationFetcher(UpdateMember, async (_key, { arg }) => {
  try {
    return await membership.update(arg);
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update member.");
  }
});

export const updateMember: MutationFetcher<
  Membership,
  SettingsPeopleKey,
  UpdateMemberInput
> = ({ clerkId }, data) => handler(clerkId, data);
