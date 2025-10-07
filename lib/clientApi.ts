import { NoteListResponse } from "@/types/note";
import { nextServer } from "./api";

import { LoginResponse, UserLogin } from "@/types/user";
import { AxiosError } from "axios";

export async function register(data: UserLogin): Promise<LoginResponse> {
  try {
    const res = await nextServer.post<LoginResponse>(
      "/api/auth/register",
      data
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Login error:", err.response?.data || err.message);
    throw error;
  }
}

export async function login(data: UserLogin) {
  const res = await nextServer.post<UserLogin>("/api/auth/login", data);
  return res.data;
}

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};

// export const fetchNoteById = async ({ noteId }: { noteId: string }) => {
//   const res = await axios.get<Note>(`/notes/${noteId}`, {
//     headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
//   });
//   return res.data;
// };

// export const deleteNote = async ({ noteId }: { noteId: string }) => {
//   await axios.delete<Note>(`/notes/${noteId}`, {
//     headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
//   });
// };

// export const createNote = async (note: {
//   title: string;
//   content: string;
//   tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
// }) => {
//   await axios.post<Note>("/notes", note, {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//   });
// };
