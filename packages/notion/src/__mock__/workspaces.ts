import type { DocItemData, Page, Workspace } from "@swy/notion";
import { randomInt } from "@swy/ui/lib";
import type { Log } from "@swy/ui/shared";
import { Plan, Role } from "@swy/validators";

import { mockUsers } from "./users";

const getRandomTs = () =>
  randomInt(Date.UTC(2024, 1, 1), Date.UTC(2024, 10, 31));

export const documents: DocItemData[] = [
  {
    group: "document",
    id: "page1",
    title: "Korean",
    parentId: null,
    icon: {
      type: "file",
      url: "https://img.freepik.com/premium-vector/line-art-flag-language-korean-illustration-vector_490632-422.jpg",
    },
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page2",
    title: "Pronunciation",
    parentId: "page1",
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page3",
    title: "Study list",
    parentId: null,
    icon: { type: "lucide", name: "book", color: "#CB912F" },
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page4",
    title: "My secret document",
    icon: { type: "lucide", name: "book-check", color: "#CB912F" },
    parentId: null,
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page5",
    title: "System flowchart",
    parentId: null,
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "trash:document",
    id: "page6",
    title: "Deprecated documents",
    parentId: null,
    icon: { type: "lucide", name: "book", color: "#337EA9" },
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "kanban",
    id: "page7",
    title: "TODO List",
    parentId: null,
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "whiteboard",
    id: "page8",
    title: "System flowchart",
    parentId: null,
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page9",
    parentId: "page3",
    title: "The High Table",
    icon: {
      type: "file",
      url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/bar-table-1447763-1224177.png",
    },
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
  {
    group: "document",
    id: "page10",
    parentId: "page3",
    title: "The Continental",
    icon: { type: "emoji", emoji: "🏠" },
    lastEditedBy: "",
    lastEditedAt: getRandomTs(),
  },
];

export const user = mockUsers[0]!;
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

export const otherUsers = mockUsers.slice(2, 7);

const createPageData = (item: DocItemData): Page => {
  const res = item.group!.split(":");
  return {
    id: item.id,
    parentId: item.parentId ?? null,
    type: res.length > 1 ? res[1]! : item.group!,
    title: item.title,
    icon: item.icon ?? null,
    isArchived: res.length > 1,
    coverImage: null,
    isPublished: false,
    createdAt: Date.UTC(2023, 3, 5),
    lastEditedAt: item.lastEditedAt,
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
