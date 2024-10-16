"use server";

import { MutationFetcher } from "swr/mutation";

import { Membership } from "@swy/prisma";
import { DeleteMember, type DeleteMemberInput } from "@swy/validators";

import {
  createMutationFetcher,
  handleError,
  membership,
  SettingsPeopleKey,
} from "~/lib";

const handler = createMutationFetcher(DeleteMember, async (_key, { arg }) => {
  try {
    return await membership.delete(arg);
  } catch (error) {
    throw handleError(error, "Failed to delete member.");
  }
});

export const deleteMember: MutationFetcher<
  Membership,
  SettingsPeopleKey,
  DeleteMemberInput
> = ({ clerkId }, data) => handler(clerkId, data);
