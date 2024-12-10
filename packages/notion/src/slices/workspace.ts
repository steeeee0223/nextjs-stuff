import type { StateCreator } from "zustand";

import type { Workspace } from "../workspace-provider";

interface WorkspaceState {
  workspaces: Record<string, Workspace>;
  activeWorkspace: string | null;
}
interface WorkspaceActions {
  setActiveWorkspace: (workspaceId: string | null) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (workspaceId: string, data: Partial<Workspace>) => void;
  deleteWorkspace: (workspaceId: string) => void;
  resetWorkspaces: () => void;
}

export type WorkspaceSlice = WorkspaceState & WorkspaceActions;

const initialState: WorkspaceState = {
  workspaces: {},
  activeWorkspace: null,
};

export const createWorkspaceSlice: StateCreator<
  WorkspaceSlice,
  [],
  [],
  WorkspaceSlice
> = (set) => ({
  ...initialState,
  setActiveWorkspace: (workspaceId) =>
    set((state) => {
      if (!(workspaceId && workspaceId in state.workspaces)) return {};
      return { activeWorkspace: workspaceId };
    }),
  setWorkspaces: (workspaces) =>
    set({
      workspaces: workspaces.reduce(
        (acc, workspace) => ({ ...acc, [workspace.id]: workspace }),
        {},
      ),
    }),
  addWorkspace: (workspace) =>
    set(({ workspaces }) => ({
      workspaces: { ...workspaces, [workspace.id]: workspace },
    })),
  updateWorkspace: (workspaceId, data) =>
    set(({ workspaces }) => ({
      workspaces: {
        ...workspaces,
        [workspaceId]: { ...workspaces[workspaceId]!, ...data },
      },
    })),
  deleteWorkspace: (workspaceId) =>
    set(({ workspaces, activeWorkspace }) => {
      delete workspaces[workspaceId];
      return activeWorkspace === workspaceId
        ? { workspaces, activeWorkspace: null }
        : { workspaces };
    }),
  resetWorkspaces: () => set(initialState),
});
