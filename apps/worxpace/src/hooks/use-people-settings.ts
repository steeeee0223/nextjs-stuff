"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import * as actions from "~/actions";
import { membership, toPeopleData, type MembershipsMap } from "~/lib";

export const usePeopleSettings = (
  info: { clerkId: string; workspaceId: string } | null,
) => {
  /** Fetcher */
  const key = info ? { type: "settings:people" as const, ...info } : null;
  const { data, mutate: fetchMemberships } = useSWR(key, ({ workspaceId }) =>
    membership.get(workspaceId),
  );
  /** Mutations */
  const options = { onError: (e: Error) => toast.error(e.message) };
  const { trigger: addMembers } = useSWRMutation(
    key,
    actions.addMembers,
    options,
  );
  const { trigger: updateMember } = useSWRMutation(
    key,
    actions.updateMember,
    options,
  );
  const { trigger: deleteMember } = useSWRMutation(
    key,
    actions.deleteMember,
    options,
  );

  return {
    memberships: data?.reduce<MembershipsMap>(
      (acc, membership) => ({ ...acc, [membership.accountId]: membership }),
      {},
    ),
    fetchMemberships: async () => {
      const members = await fetchMemberships();
      return members ? toPeopleData(members) : { members: [], guests: [] };
    },
    addMembers,
    updateMember,
    deleteMember,
  };
};
