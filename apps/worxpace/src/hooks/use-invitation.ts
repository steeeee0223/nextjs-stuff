"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useWorkspace } from "@swy/notion";

import * as actions from "~/actions";
import { invitationFetcher, type StrictedInvitationKey } from "~/lib";

interface UseInvitationOptions {
  token: string;
  clerkId?: string | null;
}

export const useInvitation = ({ token, clerkId }: UseInvitationOptions) => {
  const router = useRouter();
  const { select } = useWorkspace();
  /** SWR */
  const key = { type: "invitation" as const, token, clerkId };
  const options = { onError: (e: Error) => toast.error(e.message) };
  const { data, isLoading } = useSWR(key, invitationFetcher, options);
  const { trigger: __joinWorkspace } = useSWRMutation(
    key.clerkId ? (key as StrictedInvitationKey) : null,
    actions.joinWorkspace,
    options,
  );
  /** Handlers */
  const redirect = useCallback(
    (workspaceId: string) => {
      select(workspaceId);
      router.push(`/workspace/${workspaceId}`);
    },
    [router, select],
  );
  const joinWorkspace = async (withClerkTicket?: boolean) => {
    if (data?.accountId) {
      const res = await __joinWorkspace({
        accountId: data.accountId,
        workspaceId: data.workspace.id,
        withClerkTicket,
      });
      redirect(res.workspaceId);
    }
  };

  useEffect(() => {
    if (data?.isInWorkspace) {
      console.log(
        `[useInvitation] already in workspace, redirect to /workspace/${data.workspace.id}`,
      );
      redirect(data.workspace.id);
    }
  }, [data, redirect]);

  return { data, isLoading, joinWorkspace };
};
