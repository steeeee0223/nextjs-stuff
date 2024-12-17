import { buildTree, type TreeNode } from "@swy/ui/shared";

import type { Page } from "../types";
import type { PlatformStore } from "./use-platform-store";

export const selectPages = (state: PlatformStore, isArchived: boolean) =>
  Object.values(state.pages).filter((page) => page.isArchived === isArchived);

export const selectTreeGroup = (state: PlatformStore, group: string) => {
  const pages = Object.values(state.pages).filter(
    (page) => page.type === group && !page.isArchived,
  );
  return buildTree(pages);
};

export const selectFavorites = (state: PlatformStore) => {
  const pages = Object.values(state.pages);
  const favorites = pages.filter((page) => page.isFavorite && !page.isArchived);
  return favorites.map<TreeNode<Page>>((fav) => ({
    ...fav,
    parentId: null,
    children: buildTree(pages, fav.id),
  }));
};
