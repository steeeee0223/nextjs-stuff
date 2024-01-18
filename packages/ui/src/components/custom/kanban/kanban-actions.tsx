import type { Entity } from "@/lib";
import type { Reducer } from "react";

import type { KanbanItem, KanbanList } from "./index.types";

export type KanbanAction =
  | { type: "add:list"; payload: KanbanList }
  | { type: "add:item" | "update:item" | "delete:item"; payload: KanbanItem }
  | { type: "set" | "update:list"; payload: KanbanList[] }
  | { type: "delete:list"; payload: string[] };

export type KanbanReducer = Reducer<Entity<KanbanList>, KanbanAction>;

export function kanbanReducer(
  { ids, entities }: Entity<KanbanList>,
  { type, payload }: KanbanAction,
): Entity<KanbanList> {
  let list;
  switch (type) {
    case "add:list":
      entities[payload.id] = payload;
      return { ids: [...ids, payload.id], entities };
    case "add:item":
      list = entities[payload.listId]!;
      list.items = [...list.items, payload];
      entities[payload.listId] = list;
      return { ids, entities };
    case "set":
      payload.forEach((item) => (entities[item.id] = item));
      return { ids: Object.keys(entities), entities };
    case "update:list":
      payload.forEach((list) => (entities[list.id] = list));
      return { ids, entities };
    case "update:item":
      list = entities[payload.listId]!;
      list.items = list.items.map((item) =>
        item.id === payload.id ? payload : item,
      );
      entities[payload.listId] = list;
      return { ids, entities };
    case "delete:list":
      payload.forEach((id) => delete entities[id]);
      return { ids: Object.keys(entities), entities };
    case "delete:item":
      list = entities[payload.listId]!;
      list.items = list.items.filter((item) => item.id !== payload.id);
      entities[payload.listId] = list;
      return { ids, entities };
    default:
      throw Error(`Unknown action`);
  }
}
