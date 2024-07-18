"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { SettingsStore as Settings, UpdateSettings } from "./index.types";

interface SettingsStore extends Settings {
  update: (...params: Parameters<UpdateSettings>) => void;
  reset: () => void;
}

const initialSettings: Settings = {
  workspace: {
    id: "",
    name: "",
    icon: { type: "lucide", name: "user" },
    domain: "",
  },
  account: {
    id: "",
    name: "",
    avatarUrl: "",
    preferredName: "",
    email: "",
  },
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialSettings,
        update: ({ workspace, account }) =>
          set((state) => ({
            workspace: { ...state.workspace, ...workspace },
            account: { ...state.account, ...account },
          })),
        reset: () => set(initialSettings),
      }),
      { name: "settings" },
    ),
  ),
);
