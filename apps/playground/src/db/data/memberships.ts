import { Role } from "@swy/validators";

import type { MembershipModel } from "../types";
import { _USER } from "./accounts";
import { _WORKSPACE } from "./workspaces";

export const memberships: MembershipModel[] = [
  {
    id: "mem-1",
    role: Role.OWNER,
    accountId: _USER.U1,
    workspaceId: _WORKSPACE.W1,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-2",
    role: Role.MEMBER,
    accountId: _USER.U2,
    workspaceId: _WORKSPACE.W1,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-3",
    role: Role.GUEST,
    accountId: _USER.U3,
    workspaceId: _WORKSPACE.W1,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-4",
    role: Role.OWNER,
    accountId: _USER.U3,
    workspaceId: _WORKSPACE.W2,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-5",
    role: Role.MEMBER,
    accountId: _USER.U1,
    workspaceId: _WORKSPACE.W2,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-6",
    role: Role.OWNER,
    accountId: _USER.U1,
    workspaceId: _WORKSPACE.W3,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-7",
    role: Role.OWNER,
    accountId: _USER.U2,
    workspaceId: _WORKSPACE.W4,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-8",
    role: Role.OWNER,
    accountId: _USER.U2,
    workspaceId: _WORKSPACE.W5,
    joinedAt: Date.UTC(2024, 1, 1),
  },
  {
    id: "mem-9",
    role: Role.OWNER,
    accountId: _USER.U3,
    workspaceId: _WORKSPACE.W5,
    joinedAt: Date.UTC(2024, 1, 1),
  },
];
