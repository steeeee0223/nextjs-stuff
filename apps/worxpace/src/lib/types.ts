export interface Client {
  role: "admin" | "personal" | "organization";
  userId: string;
  orgId: string | null;
  path: string;
  username: string;
  workspace: string;
}
