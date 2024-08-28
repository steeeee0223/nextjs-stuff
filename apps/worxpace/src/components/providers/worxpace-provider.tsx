"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import {
  WorkspaceProvider,
  type UserState,
  type Workspace,
} from "@acme/ui/notion";

import { useClient, usePlatform, useSetup } from "~/hooks";

export const WorxpaceProvider = ({ children }: PropsWithChildren) => {
  const { name, email, clerkId } = useClient();
  const params = useParams<{ workspaceId?: string }>();
  const [user, setUser] = useState<UserState>({ id: "", name, email });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const platform = usePlatform();
  useEffect(() => {
    if (params.workspaceId) {
      platform.update((prev) => ({
        ...prev,
        clerkId,
        workspaceId: params.workspaceId!,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkId, params.workspaceId]);

  const { accountMemberships } = useSetup({ clerkId });
  useEffect(() => {
    if (!accountMemberships) return;
    const { name, email, accountId, workspaces } = accountMemberships;
    platform.update((prev) => ({ ...prev, accountId }));
    setUser({ id: accountId, name, email });
    setWorkspaces(workspaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountMemberships]);

  return (
    <WorkspaceProvider
      className="h-full"
      user={user}
      workspaces={workspaces}
      initial={platform.workspaceId}
    >
      {children}
    </WorkspaceProvider>
  );
};
