"use client";

import { create } from "zustand";

import type { UserState } from "./index.types";

interface UserStore {
  info: UserState | null;
  select: (user: UserState) => void;
  logout: () => void;
}

export const useUser = create<UserStore>((set) => ({
  info: null,
  select: (info) => set({ info }),
  logout: () => set({ info: null }),
}));
