"use client";

import React, { useState } from "react";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/lib/clientApi";
import { useUserStore } from "@/lib/store/authStore";
import { ApiError } from "@/app/api/api";

export default function SignIn() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      const res = await login({ email, password });

      if (res) {
        setUser(res); // Зберігаємо user + токени
        router.push("/profile");
      }
    } catch (err) {
      setError(
        (err as ApiError).response?.data?.error ??
          (err as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form
        className={css.form}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleSubmit(formData);
        }}
      >
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
