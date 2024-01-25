import type { Reducer } from "react";

import type { TreeItem } from "./index.types";

export interface Entity<T> {
  ids: string[];
  entities: Record<string, T>;
}

export interface Modified<T> {
  item: T;
  ids: string[];
}

export type TreeAction<T> =
  | { type: "add" | "set"; payload: T[] }
  | { type: "archive" | "restore"; payload: Modified<T> }
  | { type: "update"; payload: T }
  | { type: "delete"; payload: string[] };

export type TreeReducer = Reducer<Entity<TreeItem>, TreeAction<TreeItem>>;

export function treeReducer(
  { ids, entities }: Entity<TreeItem>,
  { type, payload }: TreeAction<TreeItem>,
): Entity<TreeItem> {
  let e;
  switch (type) {
    case "add":
      payload.forEach((item) => (entities[item.id] = item));
      return { ids: Object.keys(entities), entities };
    case "set":
      e = payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
      // payload.forEach((item) => (entities[item.id] = item));
      return { ids: Object.keys(e), entities: e };
    case "update":
      entities[payload.id] = payload;
      return { ids, entities };
    case "archive":
      entities[payload.item.id] = payload.item;
      payload.ids.forEach((id) => (entities[id]!.isArchived = true));
      return { ids, entities };
    case "restore":
      entities[payload.item.id] = payload.item;
      payload.ids.forEach((id) => (entities[id]!.isArchived = false));
      return { ids, entities };
    case "delete":
      payload.forEach((id) => delete entities[id]);
      return { ids: Object.keys(entities), entities };
    default:
      throw Error(`Unknown action`);
  }
}
