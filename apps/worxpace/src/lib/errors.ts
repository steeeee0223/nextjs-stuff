import { ClerkAPIResponseError } from "@clerk/shared";

import { env } from "~/env";

export enum ErrorType {
  UNAUTHORIZED = "Unauthorized",
  NOT_FOUND = "Not found",
  UNEXPECTED = "Unexpected error",
}

export class CustomError extends Error {
  constructor(
    public key: keyof typeof ErrorType,
    public cause?: string,
  ) {
    super(ErrorType[key], { cause });
  }

  toString() {
    return env.NODE_ENV === "production"
      ? `🚫 ${this.message}`
      : `🚫 ${this.message}@${this.stack ?? "_"} - ${this.cause}`;
  }
}

export function handleError(error: unknown, msg?: string): Error {
  if (error instanceof ClerkAPIResponseError) {
    console.error(`🚫 [${error.status}] ${error.name} - ${error.message}`);
    return new CustomError("UNEXPECTED", error.name);
  }
  if (error instanceof CustomError) {
    console.error(error.toString());
    return error;
  }

  const unexpected = new CustomError("UNEXPECTED", msg ?? (error as string));
  console.error(unexpected.toString());
  return unexpected;
}
