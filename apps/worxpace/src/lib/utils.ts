import { auth } from "@clerk/nextjs";

export function isAuthenticated(): boolean {
  const { userId } = auth();
  return !!userId;
}
