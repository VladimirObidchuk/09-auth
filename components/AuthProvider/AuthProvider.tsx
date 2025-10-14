"use client";

import { checkSession, getMe } from "@/lib/clientApi";
import { useUserStore } from "@/lib/store/authStore";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useUserStore((state) => state.setUser);
  const clearIsAuthenticated = useUserStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser({ user });
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("AuthProvider error:", error);
        clearIsAuthenticated();
      } finally {
      }
    };

    // 🔹 Викликаємо лише на клієнті
    if (typeof window !== "undefined") fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
