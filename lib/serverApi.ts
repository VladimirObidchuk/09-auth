import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import { Note, NoteListResponse } from "@/types/note";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
}

// ================= AUTH =================

export async function serverCheckSession() {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User | null>("/auth/session", { headers });
  return data;
}

export async function serverGetMe() {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>("/users/me", { headers });
  return data;
}

// ================= NOTES =================

export async function serverFetchNotes(params?: {
  search?: string;
  page?: number;
  tag?: string;
}) {
  const headers = await getAuthHeaders();
  const { data } = await api.get<NoteListResponse>("/notes", {
    headers,
    params,
  });
  return data;
}

export async function serverFetchNoteById(noteId: string) {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${noteId}`, { headers });
  return data;
}
