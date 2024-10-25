"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useReducer, useState } from "react";

import type { KanbanHandlers, KanbanItem, KanbanList } from "./index.types";
import type { KanbanReducer } from "./kanban-actions";
import { kanbanReducer } from "./kanban-actions";
import { KanbanContainer } from "./kanban-container";
import type { KanbanContextInterface } from "./kanban-context";
import { KanbanContext } from "./kanban-context";
import { findMaxOrder } from "./utils";

interface KanbanProviderProps extends PropsWithChildren, KanbanHandlers {
  className?: string;
  isLoading?: boolean;
  initialLists?: KanbanList[];
  onOpenItem?: (item: KanbanItem) => void;
}

export function KanbanProvider({
  className,
  children,
  isLoading = false,
  initialLists = [],
  ...handlers
}: KanbanProviderProps) {
  /** Kanban Item */
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);
  /** Kanban Lists */
  const $initialLists = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<KanbanReducer>(
    kanbanReducer,
    $initialLists,
  );

  useEffect(() => {
    dispatch({ type: "set", payload: initialLists });
  }, [initialLists]);

  const kanbanLists = useMemo(() => Object.values(state.entities), [state]);
  const kanbanContextValues = useMemo<KanbanContextInterface>(
    () => ({
      isLoading,
      kanbanLists,
      activeItem,
      dispatch,
      setActiveItem,
      getKanbanItem: (listId, itemId) =>
        state.entities[listId]?.items.find(({ id }) => itemId === id),
      getKanbanList: (listId) => state.entities[listId],
      getMaxItemOrder: (listId) => findMaxOrder(state.entities[listId]!.items),
      getMaxListOrder: () => findMaxOrder(kanbanLists),
      ...handlers,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeItem, isLoading, kanbanLists, state.entities],
  );

  return (
    <KanbanContext.Provider value={kanbanContextValues}>
      <div className={className}>
        <KanbanContainer />
      </div>
      <div>{children}</div>
    </KanbanContext.Provider>
  );
}
