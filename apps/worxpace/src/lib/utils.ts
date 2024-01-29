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
/**
 * Utility for fetching url
 */
export function fetchUrl<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json() as T);
}
/**
 * Utility for parsing boolean params in url
 */
export function parseBool(x?: string | null): boolean | undefined {
  switch (true) {
    case x === null || x === undefined:
      return undefined;
    case x === "true":
      return true;
    case x === "false":
      return false;
    default:
      throw new Error(`Invalid argument: ${x}`);
  }
}
