import { Role } from "@/components/notion/types";

export interface Account {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
}

export interface MemberRow {
  account: Account;
  teamspaces: {
    current: string | null;
    options: GroupRow[];
  };
  groups: {
    current: string | null;
    options: GroupRow[];
  };
  role: Role;
}

export interface GuestRow {
  account: Account;
  access: PageAccess[];
}

export interface GroupRow {
  id: string;
  name: string;
  members: number;
}

export interface PageAccess {
  id: string;
  name: string;
  scope: string;
}
