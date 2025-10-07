"use client";

import React, { useState } from "react";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/types/user";
import { register } from "@/lib/clientApi";
import { ApiError } from "@/app/api/api";

const SingUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const hadnleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UserLogin;
      const res = await register(formValues);

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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={hadnleSubmit}>
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};

export default SingUp;
