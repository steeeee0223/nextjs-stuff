"use client";

import { createContext, useContext, type Dispatch } from "react";

import type { TreeItem } from "./index.types";
import type { TreeAction } from "./tree-actions";

export interface TreeContextInterface {
  isLoading: boolean;
  treeItems: TreeItem[];
  groups?: string[];
  dispatch: Dispatch<TreeAction<TreeItem>>;
  getGroup: (group: string) => TreeItem[];
  getChildren: (parentId: string | null, group: string | null) => TreeItem[];
  isItemActive?: (id: string) => boolean;
  onClickItem?: (id: string) => void;
}

export const TreeContext = createContext<TreeContextInterface | null>(null);

export function useTree(): TreeContextInterface {
  const object = useContext(TreeContext);
  if (!object) throw new Error("useTree must be used within TreeProvider");
  return object;
}
