import { FolderIcon, Settings } from "lucide-react";

import type { TreeItem } from "@acme/ui/components";

export const delay = async (timeout: number) =>
  await new Promise((resolve) => setTimeout(resolve, timeout));

export const folderSystemItems: TreeItem[] = [
  {
    group: null,
    // isArchived: false,
    id: "test-id-1",
    title: "app",
    parentId: null,
    icon: FolderIcon,
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-2",
    title: "page.tsx",
    parentId: "test-id-1",
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-3",
    title: "layout.tsx",
    parentId: "test-id-1",
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-4",
    title: "globals.css",
    parentId: "test-id-1",
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-5",
    title: "docs",
    parentId: "test-id-1",
    icon: FolderIcon,
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-6",
    title: "page.tsx",
    parentId: "test-id-5",
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-7",
    title: "package.json",
    parentId: null,
  },
  {
    group: null,
    // isArchived: false,
    id: "test-id-8",
    title: "tsconfig.json",
    parentId: null,
  },
];

export const groupFolderItems: TreeItem[] = [
  {
    group: "main",
    // isArchived: false,
    id: "test-id-1",
    title: "app",
    parentId: null,
    icon: FolderIcon,
  },
  {
    group: "main",
    // isArchived: false,
    id: "test-id-2",
    title: "page.tsx",
    parentId: "test-id-1",
  },
  {
    group: "main",
    // isArchived: false,
    id: "test-id-3",
    title: "layout.tsx",
    parentId: "test-id-1",
  },
  {
    group: "main",
    // isArchived: false,
    id: "test-id-4",
    title: "globals.css",
    parentId: "test-id-1",
  },
  {
    group: "main",
    // isArchived: false,
    id: "test-id-5",
    title: "docs",
    parentId: "test-id-1",
    icon: FolderIcon,
  },
  {
    group: "main",
    // isArchived: false,
    id: "test-id-6",
    title: "page.tsx",
    parentId: "test-id-5",
  },
  {
    group: "config",
    // isArchived: false,
    id: "test-id-7",
    title: "package.json",
    parentId: null,
    icon: Settings,
  },
  {
    group: "config",
    // isArchived: false,
    id: "test-id-8",
    title: "tsconfig.json",
    parentId: null,
    icon: Settings,
  },
];
