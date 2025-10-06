import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export type GetNotesParams = {
  search?: string;
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
};
