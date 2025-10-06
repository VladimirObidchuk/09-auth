import { UserLogin } from "@/types/user";
import { nextServer } from "./api";

export async function register(data: UserLogin) {
  const res = await nextServer.post("/auth/login", data);
  return res.data;
}
