"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import {
  WorkspaceProvider as Provider,
  type User,
  type Workspace,
} from "@swy/ui/notion";

import { useClient, usePlatform, useSetup } from "~/hooks";

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
  const { name, email, clerkId, avatarUrl } = useClient();
  const params = useParams<{ workspaceId?: string }>();
  const [user, setUser] = useState<User>({ id: "", name, email, avatarUrl });
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const platform = usePlatform();
  useEffect(() => {
    if (params.workspaceId) {
      platform.update((prev) => ({
        ...prev,
        workspaceId: params.workspaceId!,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.workspaceId]);
  useEffect(() => {
    platform.update((prev) => ({ ...prev, clerkId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkId]);

  const { accountMemberships } = useSetup({ clerkId });
  useEffect(() => {
    if (!accountMemberships) return;
    const { name, email, accountId, workspaces } = accountMemberships;
    platform.update((prev) => ({ ...prev, accountId }));
    setUser({ id: accountId, name, email, avatarUrl });
    setWorkspaces(workspaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountMemberships]);

  return (
    <Provider
      className="h-full"
      user={user}
      workspaces={workspaces}
      initial={platform.workspaceId}
    >
      {children}
    </Provider>
  );
};
