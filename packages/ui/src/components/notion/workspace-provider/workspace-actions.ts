import { type Reducer } from "react";

import { Entity } from "@/lib/types";
import { Workspace } from "./index.types";

export type WorkspaceAction =
  | { type: "set"; payload: Workspace[] }
  | { type: "add" | "update"; payload: Workspace }
  | { type: "delete"; payload: string[] };

export type WorkspaceReducer = Reducer<Entity<Workspace>, WorkspaceAction>;

export function workspaceReducer(
  { ids, entities }: Entity<Workspace>,
  { type, payload }: WorkspaceAction,
): Entity<Workspace> {
  let e;
  switch (type) {
    case "add":
      entities[payload.id] = payload;
      return { ids: Object.keys(entities), entities };
    case "set":
      e = payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
      return { ids: Object.keys(e), entities: e };
    case "update":
      entities[payload.id] = payload;
      return { ids, entities };
    case "delete":
      payload.forEach((id) => delete entities[id]);
      return { ids: Object.keys(entities), entities };
    default:
      throw Error(`Unknown action`);
  }
}
