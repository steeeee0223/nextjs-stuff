"use client";

import { useReducer, type PropsWithChildren } from "react";

import type { TreeItem } from "./index.types";
import { treeReducer, type TreeReducer } from "./tree-actions";
import { TreeContext, type TreeContextInterface } from "./tree-context";

export interface TreeProviderProps extends PropsWithChildren {
  className?: string;
  groups?: string[];
  isLoading?: boolean;
  initialItems?: TreeItem[];
  isItemActive?: (id: string, group: string | null) => boolean;
  onClickItem?: (id: string, group: string | null) => void;
}

export function TreeProvider({
  className,
  isLoading = false,
  initialItems = [],
  children,
  groups,
  isItemActive,
  onClickItem,
}: TreeProviderProps) {
  const initializer = (init: TreeItem[]) => {
    const e = init.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
    return { ids: Object.keys(e), entities: e };
  };
  const [state, dispatch] = useReducer<TreeReducer, TreeItem[]>(
    treeReducer,
    initialItems,
    initializer,
  );

  const getChildren = ($parentId: string | null, $group: string | null) =>
    Object.values(state.entities).filter(
      ({ parentId, group }) => $group === group && $parentId === parentId,
    );
  const getGroup = ($group: string) =>
    Object.values(state.entities).filter(({ group }) => group === $group);

  const treeContextValues: TreeContextInterface = {
    isLoading: isLoading || !initialItems,
    groups,
    treeItems: Object.values(state.entities),
    dispatch,
    getGroup,
    getChildren,
    isItemActive,
    onClickItem,
  };

  return (
    <TreeContext.Provider value={treeContextValues}>
      <div className={className}>{children}</div>
    </TreeContext.Provider>
  );
}
