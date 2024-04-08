import type { TreeItem } from "@acme/ui/components";

export const delay = async (timeout: number) =>
  await new Promise((resolve) => setTimeout(resolve, timeout));

export const folderSystemItems: TreeItem[] = [
  {
    group: null,
    id: "test-id-1",
    title: "app",
    parentId: null,
    icon: { type: "lucide", name: "folder" },
  },
  {
    group: null,
    id: "test-id-2",
    title: "page.tsx",
    parentId: "test-id-1",
  },
  {
    group: null,
    id: "test-id-3",
    title: "layout.tsx",
    parentId: "test-id-1",
  },
  {
    group: null,
    id: "test-id-4",
    title: "globals.css",
    parentId: "test-id-1",
  },
  {
    group: null,
    id: "test-id-5",
    title: "docs",
    parentId: "test-id-1",
    icon: { type: "lucide", name: "folder" },
  },
  {
    group: null,
    id: "test-id-6",
    title: "page.tsx",
    parentId: "test-id-5",
  },
  {
    group: null,
    id: "test-id-7",
    title: "package.json",
    parentId: null,
  },
  {
    group: null,
    id: "test-id-8",
    title: "tsconfig.json",
    parentId: null,
  },
];

export const groupFolderItems: TreeItem[] = [
  {
    group: "main",
    id: "test-id-1",
    title: "app",
    parentId: null,
    icon: { type: "lucide", name: "folder" },
  },
  {
    group: "main",
    id: "test-id-2",
    title: "page.tsx",
    parentId: "test-id-1",
  },
  {
    group: "main",
    id: "test-id-3",
    title: "layout.tsx",
    parentId: "test-id-1",
  },
  {
    group: "main",
    id: "test-id-4",
    title: "globals.css",
    parentId: "test-id-1",
  },
  {
    group: "main",
    id: "test-id-5",
    title: "docs",
    parentId: "test-id-1",
    icon: { type: "lucide", name: "folder" },
  },
  {
    group: "main",
    id: "test-id-6",
    title: "page.tsx",
    parentId: "test-id-5",
  },
  {
    group: "config",
    id: "test-id-7",
    title: "package.json",
    parentId: null,
    icon: { type: "lucide", name: "settings" },
  },
  {
    group: "config",
    id: "test-id-8",
    title: "tsconfig.json",
    parentId: null,
    icon: { type: "lucide", name: "settings" },
  },
];
