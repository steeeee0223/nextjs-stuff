"use client";

import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type PropsWithChildren,
} from "react";

import type { User } from "../types";
import type { Workspace } from "./index.types";
import { workspaceReducer, type WorkspaceReducer } from "./workspace-actions";
import {
  WorkspaceContext,
  type WorkspaceContextInterface,
} from "./workspace-context";

export interface WorkspaceProviderProps extends PropsWithChildren {
  user: User;
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
  const [state, dispatch] = useReducer<WorkspaceReducer, Workspace[]>(
    workspaceReducer,
    workspaces,
    (init) => {
      const entities = init.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {},
      );
      return { ids: Object.keys(entities), entities };
    },
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

  const workspaceContextValues = useMemo<WorkspaceContextInterface>(
    () => ({
      user,
      workspaces: Object.values(state.entities),
      activeWorkspace,
      dispatch,
      select: (id) => setActiveWorkspace(id ? state.entities[id]! : null),
    }),
    [user, state.entities, activeWorkspace],
  );

  return (
    <WorkspaceContext.Provider value={workspaceContextValues}>
      <div className={className}>{children}</div>
    </WorkspaceContext.Provider>
  );
}
