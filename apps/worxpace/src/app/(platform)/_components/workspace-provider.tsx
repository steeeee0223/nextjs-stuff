"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import { usePlatformStore } from "@swy/notion";

import { useClient, usePlatform, useSetup } from "~/hooks";

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
  const { clerkId, avatarUrl } = useClient();
  const params = useParams<{ workspaceId?: string }>();
  const setUser = usePlatformStore((state) => state.setUser);
  const setClerkId = usePlatformStore((state) => state.setClerkId);
  const setWorkspaces = usePlatformStore((state) => state.setWorkspaces);

  const platform = usePlatform();
  useEffect(() => {
    if (!params.workspaceId) return;
    platform.switchWorkspace(params.workspaceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.workspaceId]);
  useEffect(() => {
    console.log(`effect: got clerkId ${clerkId}`);
    setClerkId(clerkId);
  }, [clerkId, setClerkId]);

  const { accountMemberships } = useSetup({ clerkId });
  useEffect(() => {
    if (!accountMemberships) return;
    const { name, email, accountId, workspaces } = accountMemberships;
    setUser({ id: accountId, name, email, avatarUrl });
    setWorkspaces(workspaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountMemberships]);

  return <div className="h-full">{children}</div>;
};
