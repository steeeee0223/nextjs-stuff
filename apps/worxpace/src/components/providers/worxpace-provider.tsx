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

  const { workspaceId, update } = usePlatform();

  useEffect(() => {
    if (params.workspaceId) {
      update((prev) => ({ ...prev, workspaceId: params.workspaceId! }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.workspaceId]);

  const { accountMemberships } = useSetup({ clerkId });
  useEffect(() => {
    if (!accountMemberships) return;
    const { name, email, id, memberships } = accountMemberships;
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
  }, [accountMemberships]);

  return (
    <WorkspaceProvider
      className="h-full"
      user={user}
      workspaces={workspaces}
      initial={workspaceId}
    >
      {children}
    </WorkspaceProvider>
  );
};
