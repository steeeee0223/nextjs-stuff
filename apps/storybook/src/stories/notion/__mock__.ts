import type { Log, TreeItem } from "@acme/ui/custom";
import { Plan, Role } from "@acme/ui/notion";
import type {
  Page,
  SettingsStore,
  User,
  Workspace,
  WorkspaceMemberships,
} from "@acme/ui/notion";

export const documents: TreeItem[] = [
  {
    group: "document",
    id: "page1",
    title: "Korean",
    parentId: null,
    icon: {
      type: "file",
      url: "https://img.freepik.com/premium-vector/line-art-flag-language-korean-illustration-vector_490632-422.jpg",
    },
  },
  {
    group: "document",
    id: "page2",
    title: "Pronunciation",
    parentId: "page1",
  },
  {
    group: "document",
    id: "page3",
    title: "Study list",
    parentId: null,
    icon: { type: "lucide", name: "book", color: "#CB912F" },
  },
  {
    group: "document",
    id: "page4",
    title: "My secret document",
    icon: { type: "lucide", name: "book-check", color: "#CB912F" },
    parentId: null,
  },
  {
    group: "document",
    id: "page5",
    title: "System flowchart",
    parentId: null,
  },
  {
    group: "trash:document",
    id: "page6",
    title: "Deprecated documents",
    parentId: null,
    icon: { type: "lucide", name: "book", color: "#337EA9" },
  },
  {
    group: "kanban",
    id: "page7",
    title: "TODO List",
    parentId: null,
  },
  {
    group: "whiteboard",
    id: "page8",
    title: "System flowchart",
    parentId: null,
  },
];

export const GROUPS = [
  "document",
  "kanban",
  "whiteboard",
  "workflow",
  "trash:document",
  "trash:kanban",
  "trash:whiteboard",
  "trash:workflow",
];

export const user: User = {
  id: "123",
  name: "John Wick",
  avatarUrl: "https://avatarfiles.alphacoders.com/370/370979.jpg",
  email: "john-wick@example.com",
};
export const workspaces: Workspace[] = [
  {
    id: "workspace-0",
    name: "John's Private",
    icon: { type: "lucide", name: "activity", color: "#CB912F" },
    members: 1,
    plan: Plan.EDUCATION,
    role: Role.OWNER,
  },
  {
    id: "workspace-1",
    name: "Workspace 1",
    icon: { type: "lucide", name: "briefcase", color: "#337EA9" },
    members: 3,
    plan: Plan.FREE,
    role: Role.OWNER,
  },
  {
    id: "workspace-2",
    name: "Workspace 2",
    icon: { type: "emoji", emoji: "🎨" },
    members: 2,
    plan: Plan.BUSINESS,
    role: Role.MEMBER,
  },
  {
    id: "workspace-3",
    name: "Workspace 3",
    icon: { type: "emoji", emoji: "🚧" },
    members: 8,
    plan: Plan.ENTERPRISE,
    role: Role.GUEST,
  },
];

export const mockConnections = [
  {
    id: "connection-1",
    connection: { type: "github", account: "shadcn-ui" },
    scopes: ["Can preview links", "Can content"],
  },
];
export const mockSettings: SettingsStore = {
  workspace: { ...workspaces[0]!, domain: "fake-domain" },
  account: { ...user, preferredName: "Jonathan", language: "en" },
};

export const mockMemberships: WorkspaceMemberships = {
  members: [
    {
      user,
      teamspaces: {
        current: "1",
        options: [{ id: "1", name: "General", members: 29 }],
      },
      groups: { current: null, options: [] },
      role: Role.OWNER,
    },
    {
      user: {
        id: "124",
        name: "John Cena",
        avatarUrl: "https://github.com/shadcn.png",
        email: "john-cena@example.com",
      },
      teamspaces: { current: null, options: [] },
      groups: { current: null, options: [] },
      role: Role.MEMBER,
    },
  ],
  guests: [
    {
      user: {
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

export const otherUsers: User[] = [
  mockMemberships.members[1]!.user,
  mockMemberships.guests[0]!.user,
];

const createPageData = (treeItem: TreeItem): Page => {
  const res = treeItem.group!.split(":");
  return {
    id: treeItem.id,
    type: res.length > 1 ? res[1]! : treeItem.group!,
    title: treeItem.title,
    icon: treeItem.icon ?? null,
    isArchived: res.length > 1,
    coverImage: null,
    isPublished: false,
    createdAt: Date.UTC(2023, 3, 5).toString(),
    lastEditedAt: Date.UTC(2023, 5, 5).toString(),
    createdBy: user.name,
    lastEditedBy: user.name,
  };
};

export const mockPages: Record<string, Page> = documents
  .map((item) => createPageData(item))
  .reduce((acc, page) => ({ ...acc, [page.id]: page }), {});

export const mockLogs: Log[] = [
  {
    username: user.name,
    avatar: user.avatarUrl,
    action: "create",
    entity: {
      entityId: "page4",
      type: "document",
      title: "My secret document",
    },
    createdAt: new Date(Date.UTC(2023, 3, 5)),
  },
  {
    username: user.name,
    avatar: user.avatarUrl,
    action: "update",
    entity: {
      entityId: "page4",
      type: "document",
      title: "My secret document",
    },
    createdAt: new Date(Date.UTC(2023, 3, 7)),
  },
];
