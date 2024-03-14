"use client";

import { useAuth, useOrganization, useUser } from "@clerk/nextjs";

import type { Client } from "~/lib";

export const useClient = (): Client => {
  const { userId, orgId } = useAuth();
  const { user } = useUser();
  const { organization } = useOrganization();
  if (!userId || !user)
    return {
      role: "personal",
      userId: "unknown",
      orgId: null,
      path: "/",
      username: "User",
      workspace: "Unknown",
      workspaceId: "unknown",
    };
  if (!orgId || !organization) {
    /** @todo Admin role */
    /** User role */
    return {
      role: "personal",
      userId,
      orgId: null,
      path: `/personal/${userId}`,
      username: user.fullName ?? "User",
      workspace: user.fullName ?? "User",
      workspaceId: userId,
    };
  } else {
    return {
      role: "organization",
      userId,
      orgId,
      path: `/organization/${orgId}`,
      username: user.fullName ?? "User",
      workspace: organization.name,
      workspaceId: orgId,
    };
  }
};
