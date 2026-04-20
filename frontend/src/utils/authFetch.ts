import { BASE_URL } from "@/api/configs";
import { refreshToken } from "./auth";

export async function authFetch(url: string, options: RequestInit = {}) {
  let token = localStorage.getItem("access_token");

  const request = async (tk: string | null) =>
    fetch(BASE_URL + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(tk ? { Authorization: `Bearer ${tk}` } : {}),
        ...(options.headers || {}),
      },
    });

  let res = await request(token);

  if (res.status === 401) {
    try {
      const newToken = await refreshToken();

      localStorage.setItem("access_token", newToken);

      res = await request(newToken);
    } catch (e) {
      console.log("Refresh failed:", e);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  return res;
}