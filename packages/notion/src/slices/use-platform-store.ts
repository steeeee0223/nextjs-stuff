"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import { createUserSlice, type UserSlice } from "./account";
import { createPageSlice, type PageSlice } from "./page";
import { createWorkspaceSlice, type WorkspaceSlice } from "./workspace";

type Store = UserSlice & WorkspaceSlice & PageSlice;

const useStore = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createWorkspaceSlice(...a),
      ...createPageSlice(...a),
    }),
    { name: "platform" },
  ),
);

export const usePlatformStore = <T>(selector: (state: Store) => T) =>
  useStore<T>(useShallow(selector));
