"use client";

import React, { useState } from "react";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/lib/clientApi";
import { UserLogin } from "@/types/user";
import { ApiError } from "@/app/api/api";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");

  const hadnleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UserLogin;
      const res = await login(formValues);

      if (res) {
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={hadnleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
