import type { Reducer } from "react";

import type { Entity } from "@swy/ui/lib";

import type { TreeItem } from "./index.types";

export type TreeAction<T> =
  | { type: "add" | "set"; payload: T[] }
  | { type: "update:item"; payload: T }
  | { type: "delete"; payload: string[] }
  | { type: "update:group"; payload: { group: string; ids: string[] } };

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
      return { ids: Object.keys(e), entities: e };
    case "update:item":
      entities[payload.id] = payload;
      return { ids, entities };
    case "update:group":
      payload.ids.forEach((id) => (entities[id]!.group = payload.group));
      return { ids, entities };
    case "delete":
      payload.forEach((id) => delete entities[id]);
      return { ids: Object.keys(entities), entities };
    default:
      throw Error(`Unknown action`);
  }
}
