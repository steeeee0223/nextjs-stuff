"use client";

import { useMemo, useState, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

import { Spinner } from "@acme/ui/custom";
import {
  WorkspaceProvider,
  type UserState,
  type Workspace,
} from "@acme/ui/notion";

import { useClient } from "~/hooks";
import { account, toIconInfo } from "~/lib";

export const WorxpaceProvider = ({ children }: PropsWithChildren) => {
  const { username, email } = useClient();
  const { userId: clerkId } = useAuth();
  const params = useParams<{ workspaceId?: string }>();
  const [user, setUser] = useState<UserState>({
    id: "",
    name: username,
    email,
  });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const { isLoading } = useSWR(
    clerkId ? { type: "settings", clerkId } : null,
    async (key) => {
      const data = await account.get(key.clerkId);
      if (!data) throw new Error("Not Found.");
      return data;
    },
    {
      onSuccess: ({ name, email, id, memberships }) => {
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
      },
    },
  );

  const initial = useMemo(
    () => params.workspaceId ?? workspaces.at(0)?.id ?? "",
    [params.workspaceId, workspaces],
  );

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  return (
    <WorkspaceProvider
      className="h-full"
      user={user}
      workspaces={workspaces}
      initial={initial}
    >
      {children}
    </WorkspaceProvider>
  );
};
