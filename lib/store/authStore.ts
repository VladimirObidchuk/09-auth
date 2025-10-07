"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponse } from "@/types/user";

type UserState = LoginResponse & { isAuthenticated: boolean };

type UserDraftStore = {
  user: UserState;
  setUser: (user: LoginResponse) => void;
  clearIsAuthenticated: () => void;
};
const initialUser = {
  userName: "",
  email: "",
  avatar: "",
  accessToken: "",
  refreshToken: "",
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
