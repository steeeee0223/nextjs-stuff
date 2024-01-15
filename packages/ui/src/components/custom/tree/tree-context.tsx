"use client";

import { createContext, useContext } from "react";

import type { TreeItem } from "./index.types";

export interface TreeContextInterface {
  isLoading: boolean;
  treeItems: TreeItem[];
  archivedItems: TreeItem[];
  getChildren: (isArchived: boolean, parentId: string | null) => TreeItem[];
  isItemActive?: (id: string) => boolean;
  onClickItem?: (id: string) => void;
}

export const TreeContext = createContext<TreeContextInterface | null>(null);

export function useTree(): TreeContextInterface {
  const object = useContext(TreeContext);
  if (!object) throw new Error("useTree must be used within TreeProvider");
  return object;
}
