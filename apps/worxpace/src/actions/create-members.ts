"use server";

import type { MutationFetcher } from "swr/mutation";

import type { WORKSPACE_ROLE } from "@swy/prisma";
import { CreateMembers, type CreateMembersInput } from "@swy/validators";

import {
  account,
  createMutationFetcher,
  membership,
  SettingsPeopleKey,
  UnauthorizedError,
} from "~/lib";

const handler = createMutationFetcher(CreateMembers, async (_key, { arg }) => {
  const { emails, workspaceId, role } = arg;
  try {
    const accounts = await account.byEmails(emails);
    const existing = accounts.reduce<Record<string, string>>(
      (acc, { id, email }) => ({ ...acc, [email]: id }),
      {},
    );
    await membership.createMany({
      workspaceId,
      accountIds: Object.values(existing),
      role: role.toUpperCase() as WORKSPACE_ROLE,
    });
    // TODO Handle non-existing emails
    const nonExistingEmails = emails.filter((email) => !(email in existing));
    if (nonExistingEmails.length > 0) {
      console.log(
        "The following emails do not exist in the Account collection and were not processed:",
        nonExistingEmails,
      );
    }
    return { existing, nonExistingEmails };
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new Error("Failed to update member.");
  }
});

export const addMembers: MutationFetcher<
  { existing: Record<string, string>; nonExistingEmails: string[] },
  SettingsPeopleKey,
  CreateMembersInput
> = ({ workspaceId }, data) => handler(workspaceId, data);
