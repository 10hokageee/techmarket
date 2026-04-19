import { authFetch } from "@/utils/authFetch";

export async function getMe() {
  const res = await authFetch("/user/me/");

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
