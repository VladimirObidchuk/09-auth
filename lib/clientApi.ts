"use client";

import axios from "axios";
import { User } from "@/types/user";
import { Note, NoteListResponse } from "@/types/note";

// ================= BASE CONFIG =================

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study",
  withCredentials: true, // ✅ cookies автоматично передаються
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= AUTH TYPES =================

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

// ================= AUTH FUNCTIONS =================

export async function register(data: UserRegister): Promise<LoginResponse> {
  const { data: res } = await api.post<LoginResponse>("/auth/register", data);
  return res;
}

export async function login(data: UserLogin): Promise<LoginResponse> {
  const { data: res } = await api.post<LoginResponse>("/auth/login", data);
  return res;
}

export async function logout() {
  await api.post("/auth/logout");
}

// 🔹 Перевірка активної сесії (cookies)
export async function checkSession(): Promise<boolean> {
  try {
    const { data } = await api.get<User | null>("/auth/session");
    return !!data;
  } catch {
    return false;
  }
}

// 🔹 Отримати поточного користувача
export async function getMe(): Promise<User | null> {
  try {
    const { data } = await api.get<User>("/users/me");
    return data;
  } catch {
    return null;
  }
}

// 🔹 Оновити дані користувача
export async function updateMe(updateData: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", updateData);
  return data;
}

// ================= NOTES =================

export async function fetchNotes(params?: {
  search?: string;
  page?: number;
  tag?: string;
}) {
  const { data } = await api.get<NoteListResponse>("/notes", { params });
  return data;
}

export async function fetchNoteById(noteId: string) {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}) {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(noteId: string) {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
}
