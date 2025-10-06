"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserLogin } from "@/types/user";

type UserDraftStore = {
  user: UserLogin & { isAuthenticated: boolean };
  setUser: (user: UserLogin) => void;
  clearIsAuthenticated: () => void;
};
const initialUser = {
  email: "",
  password: "",
  isAuthenticated: false,
};

export const useUserStore = create<UserDraftStore>()(
  persist(
    (set) => ({
      user: initialUser,
      setUser: (user) =>
        set(() => ({ user: { ...user, isAuthenticated: true } })),
      clearIsAuthenticated: () => set(() => ({ user: initialUser })),
    }),
    {
      name: "auth-user",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
