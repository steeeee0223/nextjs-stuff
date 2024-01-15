"use client";

import type { ActionState } from "@/hooks";
import type { PropsWithChildren } from "react";
import { useReducer } from "react";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

import type { TreeItem } from "./index.types";
import type { TreeReducer } from "./tree-actions";
import type { TreeContextInterface } from "./tree-context";
import { TreeActionContext } from "./tree-action-context";
import { treeReducer } from "./tree-actions";
import { TreeContext } from "./tree-context";

interface TreeProviderProps extends PropsWithChildren {
  className?: string;
  fetchItems: () => Promise<ActionState<never, TreeItem[]>>;
  isItemActive?: (id: string) => boolean;
  onClickItem?: (id: string) => void;
}

export function TreeProvider({
  className,
  children,
  fetchItems,
  isItemActive,
  onClickItem,
}: TreeProviderProps) {
  const $initialItems = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<TreeReducer>(treeReducer, $initialItems);
  const { data, isLoading } = useFetch<TreeItem[]>(fetchItems, {
    onSuccess: (data) => dispatch({ type: "set", payload: data }),
    onError: (e) => toast.error(e),
  });

  const treeItems = Object.values(state.entities);
  console.log(`treeItems:`, treeItems);
  const treeContextValues: TreeContextInterface = {
    isLoading: isLoading || !data,
    treeItems,
    archivedItems: treeItems.filter(({ isArchived }) => isArchived),
    getChildren: ($isArchived, $parentId) =>
      treeItems.filter(
        ({ parentId, isArchived }) =>
          $parentId === parentId && isArchived === $isArchived,
      ),
    isItemActive,
    onClickItem,
  };

  return (
    <TreeContext.Provider value={treeContextValues}>
      <TreeActionContext.Provider value={{ dispatch }}>
        <div className={className}>{children}</div>
      </TreeActionContext.Provider>
    </TreeContext.Provider>
  );
}
