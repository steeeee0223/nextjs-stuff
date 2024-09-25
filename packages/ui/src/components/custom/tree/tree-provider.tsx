"use client";

import { useMemo, useReducer, type PropsWithChildren } from "react";

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
  const [state, dispatch] = useReducer<TreeReducer, TreeItem[]>(
    treeReducer,
    initialItems,
    (init) => {
      const entities = init.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {},
      );
      return { ids: Object.keys(entities), entities };
    },
  );

  const treeContextValues = useMemo<TreeContextInterface>(
    () => ({
      isLoading: isLoading || !initialItems,
      groups,
      treeItems: Object.values(state.entities),
      dispatch,
      getGroup: ($group) =>
        Object.values(state.entities).filter(({ group }) => group === $group),
      getChildren: ($parentId, $group) =>
        Object.values(state.entities).filter(
          ({ parentId, group }) => $group === group && $parentId === parentId,
        ),
      isItemActive,
      onClickItem,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, initialItems, isLoading, state.entities],
  );

  return (
    <TreeContext.Provider value={treeContextValues}>
      <div className={className}>{children}</div>
    </TreeContext.Provider>
  );
}
