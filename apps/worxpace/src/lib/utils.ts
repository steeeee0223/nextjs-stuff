import * as z from "zod";

import { COLORS } from "~/constants/theme";
import type { Action } from "./types";

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

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]!;
}

export function createMutationFetcher<Input, Output>(
  schema: z.Schema<Input>,
  handler: Action<Input, Output>,
): Action<Input, Output> {
  return async (key, { arg }) => {
    const result = schema.safeParse(arg);
    if (!result.success) throw result.error;
    return await handler(key, { arg: result.data });
  };
}

const EmailToUsername = z
  .string()
  .email()
  .transform((val) => val.split("@")[0] ?? val);

export function emailToUsername(email: string): string {
  const result = EmailToUsername.safeParse(email);
  return result.success ? result.data : email;
}
