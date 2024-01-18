"use client";

import type { Dispatch } from "react";
import { createContext, useContext } from "react";

import type { KanbanAction } from "./kanban-actions";

interface KanbanActionContextInterface {
  dispatch: Dispatch<KanbanAction>;
}

export const KanbanActionContext =
  createContext<KanbanActionContextInterface | null>(null);

export function useKanbanAction(): KanbanActionContextInterface {
  const object = useContext(KanbanActionContext);
  if (!object)
    throw new Error("useKanbanAction must be used within KanbanProvider");
  return object;
}
