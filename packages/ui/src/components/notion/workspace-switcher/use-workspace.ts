"use client";

import { create } from "zustand";

import type { WorkspaceState } from "./index.types";

interface WorkspaceStore {
  info: WorkspaceState | null;
  select: (info: WorkspaceState) => void;
  clear: () => void;
}

export const useWorkspace = create<WorkspaceStore>((set) => ({
  info: null,
  select: (info) => set({ info }),
  clear: () => set({ info: null }),
}));
