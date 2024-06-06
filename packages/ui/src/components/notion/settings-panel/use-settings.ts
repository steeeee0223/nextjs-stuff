"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { SettingsStore as Settings, UpdateSettings } from "./index.types";

interface SettingsStore extends Settings {
  update: (...params: Parameters<UpdateSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: "",
          name: "",
          email: "",
          imageUrl: "",
        },
        workspace: {
          id: "",
        },
        account: {
          avatarUrl: "",
          preferredName: "",
          email: "",
        },
        update: ({ user, workspace, account }) =>
          set((state) => ({
            user: { ...state.user, ...user },
            workspace: { ...state.workspace, ...workspace },
            account: { ...state.account, ...account },
          })),
      }),
      { name: "settings" },
    ),
  ),
);
