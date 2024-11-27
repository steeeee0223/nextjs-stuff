import type { IconInfo } from "@swy/ui/shared";
import { Plan, Role } from "@swy/validators";

export interface AccountModel {
  id: string; // default uuid
  name: string;
  email: string;
  avatarUrl: string;
  clerkId: string;
  preferredName: string;
  hasPassword?: boolean;
  updatedAt: number; // ts in 'ms'
}

export interface WorkspaceModel {
  id: string; // (uuid)
  name: string;
  icon?: IconInfo | null;
  domain: string;
  plan: Plan;
  inviteToken: string; // (uuid) default: same as `id`
  createdBy: string; // (uuid) account.id
  lastEditedAt: number; // ts in 'ms'
}

export interface MembershipModel {
  id: string; // (uuid)
  role: Role;
  accountId: string; // (uuid) account.id
  workspaceId: string; // (uuid) workspace.id
  joinedAt: number; // ts in 'ms'
}
