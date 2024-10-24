import type { SettingsStore, WorkspaceMemberships } from "@swy/notion";
import { randomItem } from "@swy/ui/lib";
import { Role } from "@swy/validators";

import { mockUsers } from "./users";
import { workspaces } from "./workspaces";

export const mockConnections = [
  {
    id: "connection-1",
    connection: { type: "github", account: "shadcn-ui" },
    scopes: ["Can preview links", "Can content"],
  },
];
export const mockSettings: SettingsStore = {
  workspace: { ...workspaces[0]!, domain: "fake-domain", inviteLink: "#" },
  account: { ...mockUsers[0]!, preferredName: "Jonathan", language: "en" },
};

const pageAccesses = [
  [
    { id: "page1", name: "Page 1", scope: "Full access" },
    { id: "page2", name: "Page 2", scope: "Can view" },
  ],
  [
    { id: "page1", name: "Page 1", scope: "Can view" },
    { id: "page2", name: "Page 2", scope: "Can view" },
  ],
  [{ id: "page1", name: "Page 1", scope: "Can view" }],
  [],
];

export const mockMemberships: WorkspaceMemberships = {
  members: [
    {
      user: mockUsers[1]!,
      teamspaces: {
        current: "1",
        options: [{ id: "1", name: "General", members: 29 }],
      },
      groups: { current: null, options: [] },
      role: Role.OWNER,
    },
    {
      user: mockUsers[2]!,
      teamspaces: { current: null, options: [] },
      groups: { current: null, options: [] },
      role: Role.MEMBER,
    },
  ],
  guests: mockUsers.slice(2).map((user) => ({
    user,
    access: randomItem(pageAccesses),
  })),
};
