"use client";

import { useEffect, useReducer, useState, type PropsWithChildren } from "react";

import type { UserState, Workspace } from "./index.types";
import { workspaceReducer, type WorkspaceReducer } from "./workspace-actions";
import {
  WorkspaceContext,
  type WorkspaceContextInterface,
} from "./workspace-context";

export interface WorkspaceProviderProps extends PropsWithChildren {
  user: UserState;
  workspaces: Workspace[];
  initial: string;
  className?: string;
}

export function WorkspaceProvider({
  className,
  children,
  workspaces,
  initial,
  user,
}: WorkspaceProviderProps) {
  const $initialItems = { ids: [], entities: {} };
  const [state, dispatch] = useReducer<WorkspaceReducer>(
    workspaceReducer,
    $initialItems,
  );
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    null,
  );

  useEffect(() => {
    dispatch({ type: "set", payload: workspaces });
  }, [workspaces]);

  useEffect(() => {
    setActiveWorkspace(workspaces.find(({ id }) => id === initial) ?? null);
  }, [workspaces, initial]);

  const workspaceContextValues: WorkspaceContextInterface = {
    user,
    // isLoading: isLoading || !data,
    workspaces: Object.values(state.entities),
    activeWorkspace,
    dispatch,
    select: (id) => setActiveWorkspace(id ? state.entities[id]! : null),
  };

  return (
    <WorkspaceContext.Provider value={workspaceContextValues}>
      <div className={className}>{children}</div>
    </WorkspaceContext.Provider>
  );
}
