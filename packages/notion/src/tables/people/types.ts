import { Role, type User } from "@swy/validators";

export interface MemberRow {
  user: User;
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
  user: User;
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
