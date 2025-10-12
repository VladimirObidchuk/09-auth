"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  username: string;
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

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      // ================= LOGIN / SET USER =================
      setUser: (data: LoginResponse | { user: User }) => {
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
            tokens: null,
            isAuthenticated: true,
          });
        }
      },

      // ================= LOGOUT =================
      clearIsAuthenticated: () => {
        set({ user: null, tokens: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-user", // ключ у localStorage
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
