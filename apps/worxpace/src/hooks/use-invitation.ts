"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { Workspace } from "@swy/prisma";
import { useWorkspace } from "@swy/ui/notion";

import * as actions from "~/actions";
import {
  account,
  workspace,
  type InvitationKey,
  type StrictedInvitationKey,
} from "~/lib";

type InvitationData = {
  workspace: Workspace;
  isSignedIn: boolean;
  accountId?: string;
  isInWorkspace?: boolean;
} | null;

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
  const { data, isLoading } = useSWR<InvitationData, Error, InvitationKey>(
    key,
    async ({ token, clerkId }) => {
      const ws = await workspace.byInviteToken(token);
      if (!ws) return null;

      if (!clerkId || clerkId === "")
        return { workspace: ws, isSignedIn: false };
      const acc = await account.byClerkId(clerkId);
      if (!acc) return { workspace: ws, isSignedIn: false };

      const isInWorkspace = await account.isInWorkspace({
        clerkId,
        workspaceId: ws.id,
      });
      return {
        workspace: ws,
        accountId: acc.id,
        isSignedIn: true,
        isInWorkspace,
      };
    },
    options,
  );
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
  const joinWorkspace = async () => {
    if (data?.accountId) {
      const res = await __joinWorkspace({
        accountId: data.accountId,
        workspaceId: data.workspace.id,
        role: "guest",
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
