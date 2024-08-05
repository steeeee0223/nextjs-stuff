"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import {
  WorkspaceProvider,
  type UserState,
  type Workspace,
} from "@acme/ui/notion";

import { useClient, usePlatform, useSetup } from "~/hooks";
import { toIconInfo } from "~/lib";

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
    const { name, email, id, memberships } = accountMemberships;
    platform.update((prev) => ({ ...prev, accountId: id }));
    setUser({ id, name, email });
    setWorkspaces(
      memberships.map<Workspace>(({ workspace, role }) => ({
        id: workspace.id,
        name: workspace.name,
        icon: toIconInfo(workspace.icon),
        role: role.toLowerCase() as Workspace["role"],
        members: 1,
        plan: "Free Plan",
      })),
    );
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
