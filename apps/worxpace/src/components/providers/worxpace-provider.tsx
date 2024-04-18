"use client";

import { useEffect, useMemo, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList, useUser } from "@clerk/nextjs";

import { Workspace, WorkspaceProvider } from "@acme/ui/notion";

import { useClient } from "~/hooks";

export const WorxpaceProvider = ({ children }: PropsWithChildren) => {
  const { user } = useUser();
  const { setActive } = useOrganizationList();
  const { userId, username, workspaceId } = useClient();
  const params = useParams();

  useEffect(() => {
    if (typeof params.clientId === "string") {
      const org = params.clientId === userId ? null : params.clientId;
      setActive?.({ organization: org }).catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.clientId, userId]);

  const initial = useMemo(
    () => (params.clientId as string) ?? workspaceId,
    [params, workspaceId],
  );

  const workspaceUser = {
    id: userId,
    name: username,
    profilePicture: { url: user?.imageUrl ?? "" },
    isDarkMode: false,
    email: user?.emailAddresses[0]?.emailAddress ?? "no email provided",
  };
  const personal: Workspace = {
    id: userId,
    name: username,
    icon: "🎑",
    owner: username,
    ownerId: userId,
    members: [],
  };
  const workspaces = [
    personal,
    ...(user?.organizationMemberships.map(({ organization: { id, name } }) => ({
      id,
      name,
      icon: "🎑",
      owner: `owner`,
      ownerId: `ownerId`,
      members: [],
    })) ?? []),
  ];

  return (
    <WorkspaceProvider
      className="h-full"
      user={workspaceUser}
      workspaces={workspaces}
      initial={initial}
    >
      {children}
    </WorkspaceProvider>
  );
};
