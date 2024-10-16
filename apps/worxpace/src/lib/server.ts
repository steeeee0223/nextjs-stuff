"use server";

import { auth } from "@clerk/nextjs/server";

import { CustomError } from "./errors";
import type { Client } from "./types";

/**
 * Utility for authorization
 */
export async function fetchClient(): Promise<Pick<Client, "type" | "clerkId">> {
  const { userId, orgId } = auth();
  if (!userId) return Promise.reject(new CustomError());

  if (!orgId) {
    /** @todo Admin role */
    /** User role */
    return Promise.resolve({ type: "personal", clerkId: userId });
  } else {
    return Promise.resolve({ type: "organization", clerkId: orgId });
  }
}
