import {
  Plan,
  Role,
  type SettingsStore,
  type WorkspaceMemberships,
} from "@acme/ui/notion";

export const mockConnections = [
  {
    id: "connection-id",
    connection: { type: "github", account: "shadcn-ui" },
    scopes: ["Can preview links", "Can content"],
  },
];
export const mockSettings: SettingsStore = {
  workspace: {
    id: "fake-workspace-id-12345",
    name: "John's Private",
    icon: { type: "emoji", emoji: "🚀" },
    domain: "fake-domain",
    plan: Plan.FREE,
    role: Role.OWNER,
  },
  account: {
    id: "fake-account-id-123",
    name: "John Wick",
    avatarUrl: "https://github.com/shadcn.png",
    preferredName: "John Doe",
    email: "johndoe@example.com",
    language: "en",
  },
};

export const mockMemberships: WorkspaceMemberships = {
  members: [
    {
      account: {
        id: "123",
        name: "John Wick",
        avatarUrl:
          "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Faff7b874-9ce5-41e0-9fb5-c1948d3ba540%2Ffavicon-gopher.png?width=240&userId=27cf0fa7-ae52-4d3f-a8bd-961291ab2a15&cache=v2",
        email: "john-wick@example.com",
      },
      teamspaces: {
        current: "1",
        options: [{ id: "1", name: "General", members: 29 }],
      },
      groups: { current: null, options: [] },
      role: Role.OWNER,
    },
    {
      account: {
        id: "124",
        name: "John Cena",
        avatarUrl:
          "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Faff7b874-9ce5-41e0-9fb5-c1948d3ba540%2Ffavicon-gopher.png?width=240&userId=27cf0fa7-ae52-4d3f-a8bd-961291ab2a15&cache=v2",
        email: "john-cena@example.com",
      },
      teamspaces: { current: null, options: [] },
      groups: { current: null, options: [] },
      role: Role.MEMBER,
    },
  ],
  guests: [
    {
      account: {
        id: "1243",
        name: "Pong",
        avatarUrl:
          "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Faff7b874-9ce5-41e0-9fb5-c1948d3ba540%2Ffavicon-gopher.png?width=240&userId=27cf0fa7-ae52-4d3f-a8bd-961291ab2a15&cache=v2",
        email: "pong@example.com",
      },
      access: [
        { id: "page1", name: "Page 1", scope: "Full access" },
        { id: "page2", name: "Page 2", scope: "Can view" },
      ],
    },
  ],
};
