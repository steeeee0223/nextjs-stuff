"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addMembers as $addMembers,
  deleteMember as $delMember,
  updateMember as $updMember,
} from "~/actions";
import { membership, toPeopleData } from "~/lib";

export const usePeopleSettings = (
  info: { clerkId: string; workspaceId: string } | null,
) => {
  /** Fetcher */
  const key = info ? { type: "settings:people" as const, ...info } : null;
  const { mutate: fetchMemberships } = useSWR(key, async ({ workspaceId }) => {
    const members = await membership.get(workspaceId);
    return toPeopleData(members);
  });
  /** Mutations */
  const options = { onError: (e: Error) => toast.error(e.message) };
  const { trigger: addMembers } = useSWRMutation(key, $addMembers, options);
  const { trigger: updateMember } = useSWRMutation(key, $updMember, options);
  const { trigger: deleteMember } = useSWRMutation(key, $delMember, options);

  return {
    fetchMemberships: async () =>
      (await fetchMemberships()) ?? { members: [], guests: [] },
    addMembers,
    updateMember,
    deleteMember,
  };
};
