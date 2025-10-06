import { NoteListResponse } from "@/types/note";
import { nextServer } from "./api";

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
