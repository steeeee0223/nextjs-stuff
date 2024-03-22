"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

import type { TreeItem } from "./index.types";
import { treeReducer, type TreeReducer } from "./tree-actions";
import { TreeContext, type TreeContextInterface } from "./tree-context";

interface TreeProviderProps extends PropsWithChildren {
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
  const $initialItems = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<TreeReducer>(treeReducer, $initialItems);

  useEffect(() => {
    dispatch({ type: "set", payload: initialItems });
  }, [initialItems]);

  const treeItems = useMemo(() => Object.values(state.entities), [state]);
  const getChildren = useCallback(
    ($parentId: string | null, $group: string | null) =>
      treeItems.filter(
        ({ parentId, group }) => $group === group && $parentId === parentId,
      ),
    [treeItems],
  );
  const getGroup = useCallback(
    ($group: string) => treeItems.filter(({ group }) => group === $group),
    [treeItems],
  );
  const treeContextValues: TreeContextInterface = {
    isLoading,
    groups,
    treeItems,
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
