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
        account: {
          avatarUrl: "",
          preferredName: "",
          email: "",
        },
        update: ({ user, account }) =>
          set((state) => ({
            user: { ...state.user, ...user },
            account: { ...state.account, ...account },
          })),
      }),
      { name: "settings" },
    ),
  ),
);
