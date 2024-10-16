"use server";

import type { MutationFetcher } from "swr/mutation";

import type { Membership } from "@swy/prisma";
import { UpdateMember, type UpdateMemberInput } from "@swy/validators";

import {
  createMutationFetcher,
  handleError,
  membership,
  SettingsPeopleKey,
} from "~/lib";

const handler = createMutationFetcher(UpdateMember, async (_key, { arg }) => {
  try {
    return await membership.update(arg);
  } catch (error) {
    throw handleError(error, "Failed to update member.");
  }
});

export const updateMember: MutationFetcher<
  Membership,
  SettingsPeopleKey,
  UpdateMemberInput
> = ({ clerkId }, data) => handler(clerkId, data);
