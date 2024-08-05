"use client";

import { useAuth, useOrganization, useUser } from "@clerk/nextjs";

import type { Client } from "~/lib";

export const useClient = (): Client => {
  const { isLoaded, userId, orgId } = useAuth();
  const { user } = useUser();
  const { organization } = useOrganization();
  if (!isLoaded || !userId || !user)
    return {
      type: "personal",
      userId: "unknown",
      orgId: null,
      clerkId: "unknown",
      name: "Unknown",
      email: "unknown",
      avatarUrl: "",
    };
  if (!orgId || !organization) {
    /** @todo Admin role */
    /** User role */
    return {
      type: "personal",
      userId,
      orgId: null,
      clerkId: userId,
      name: user.fullName ?? "User",
      email: user.emailAddresses[0]?.emailAddress ?? "",
      avatarUrl: user.imageUrl,
    };
  } else {
    return {
      type: "organization",
      userId,
      orgId,
      clerkId: orgId,
      name: organization.name,
      email: "",
      avatarUrl: organization.imageUrl,
    };
  }
};
