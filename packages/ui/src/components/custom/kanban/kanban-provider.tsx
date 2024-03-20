"use client";

import type { PropsWithChildren } from "react";
import { useMemo, useReducer, useState } from "react";
import { toast } from "sonner";
import useSWR, { type Fetcher } from "swr";

import type { KanbanHandlers, KanbanItem, KanbanList } from "./index.types";
import type { KanbanReducer } from "./kanban-actions";
import { kanbanReducer } from "./kanban-actions";
import { KanbanContainer } from "./kanban-container";
import type { KanbanContextInterface } from "./kanban-context";
import { KanbanContext } from "./kanban-context";
import { findMaxOrder } from "./utils";

interface KanbanProviderProps extends PropsWithChildren, KanbanHandlers {
  className?: string;
  queryKey?: string;
  fetchLists: Fetcher<KanbanList[]>;
  onOpenItem?: (item: KanbanItem) => void;
}

export function KanbanProvider({
  className,
  children,
  queryKey,
  fetchLists,
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
  const { data, isLoading } = useSWR<KanbanList[], Error>(
    queryKey ?? "ui:kanban",
    fetchLists,
    {
      onSuccess: (data) => dispatch({ type: "set", payload: data }),
      onError: (e) => toast.error(e.message),
    },
  );

  const kanbanLists = useMemo(() => Object.values(state.entities), [state]);
  const kanbanContextValues: KanbanContextInterface = {
    isLoading: isLoading || !data,
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
  };

  return (
    <KanbanContext.Provider value={kanbanContextValues}>
      <div className={className}>
        <KanbanContainer />
      </div>
      <div>{children}</div>
    </KanbanContext.Provider>
  );
}
