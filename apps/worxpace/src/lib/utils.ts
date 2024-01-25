import { auth } from "@clerk/nextjs";

import { UnauthorizedError } from "./errors";
import { Client } from "./types";

export function isAuthenticated(): boolean {
  const { userId } = auth();
  return !!userId;
}

/**
 * Utility for authorization
 */
export function fetchClient(): Client {
  const { userId, orgId } = auth();

  if (!userId && !orgId) throw new UnauthorizedError();

  if (!orgId) {
    /** @todo Admin role */
    /** User role */
    return {
      role: "personal",
      userId,
      orgId: null,
      path: `personal/${userId}`,
    };
  } else {
    return {
      role: "organization",
      userId,
      orgId,
      path: `organization/${orgId}`,
    };
  }
}
