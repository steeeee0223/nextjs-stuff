import type { StateCreator } from "zustand";

import type { User } from "@swy/validators";

interface UserState {
  user: User | null;
  clerkId: string | null;
}
interface UserActions {
  setClerkId: (clerkId: string) => void;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  resetUser: () => void;
}

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  user: null,
  clerkId: null,
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  ...initialState,
  setClerkId: (clerkId) => set({ clerkId }),
  setUser: (user) => set({ user }),
  updateUser: (data) => set(({ user }) => ({ user: { ...user!, ...data } })),
  resetUser: () => set(initialState),
});
