"use client";

import { createContext, useContext, type Dispatch } from "react";

import type { KanbanHandlers, KanbanItem, KanbanList } from "./index.types";
import type { KanbanAction } from "./kanban-actions";

export interface KanbanContextInterface extends KanbanHandlers {
  isLoading: boolean;
  kanbanLists: KanbanList[];
  activeItem: KanbanItem | null;
  setActiveItem: (item: KanbanItem | null) => void;
  getKanbanItem: (listId: string, itemId: string) => KanbanItem | undefined;
  getKanbanList: (listId: string) => KanbanList | undefined;
  getMaxItemOrder: (listId: string) => number;
  getMaxListOrder: () => number;
  dispatch: Dispatch<KanbanAction>;
}

export const KanbanContext = createContext<KanbanContextInterface | null>(null);

export function useKanban(): KanbanContextInterface {
  const object = useContext(KanbanContext);
  if (!object) throw new Error("useKanban must be used within KanbanProvider");
  return object;
}
