"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  userName: string;
  email: string;
  avatar: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type UserState = {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setUser: (data: LoginResponse | { user: User }) => void;
  clearIsAuthenticated: () => void;
};

const initialState: UserState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  setUser: () => {},
  clearIsAuthenticated: () => {},
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (data) => {
        if ("accessToken" in data && "refreshToken" in data) {
          set({
            user: data.user,
            tokens: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
            isAuthenticated: true,
          });
        } else {
          set({
            user: data.user,
            isAuthenticated: true,
          });
        }
      },

      clearIsAuthenticated: () => set({ ...initialState }),
    }),
    {
      name: "auth-user",
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
