"use client";

import { createContext, useContext, type Dispatch } from "react";

import type { UserState, Workspace } from "./index.types";
import type { WorkspaceAction } from "./workspace-actions";

export interface WorkspaceContextInterface {
  user: UserState;
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  dispatch: Dispatch<WorkspaceAction>;
  select: (workspaceId?: string) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextInterface | null>(
  null,
);

export function useWorkspace(): WorkspaceContextInterface {
  const object = useContext(WorkspaceContext);
  if (!object)
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  return object;
}
