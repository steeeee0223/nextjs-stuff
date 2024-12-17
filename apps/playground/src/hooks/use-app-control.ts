import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  signIn: (userId: string) => void;
  signOut: () => void;
} & (
  | { isSignedIn: false; userId: null }
  | { isSignedIn: true; userId: string }
);

export const useAppState = create<AppState>()(
  persist<AppState>(
    (set) => ({
      isSignedIn: false,
      userId: null,
      signIn: (userId) => set({ isSignedIn: true, userId }),
      signOut: () => set({ isSignedIn: false, userId: null }),
    }),
    { name: "app" },
  ),
);
