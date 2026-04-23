import { BASE_URL } from "@/api/configs";
import { authFetch } from "./authFetch";

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/user/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  const access = data.access_token || data.access;
  const refresh = data.refresh_token || data.refresh;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  return data;
}

export async function register(formData: FormData) {
  const res = await fetch(`${BASE_URL}/user/register/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.detail || "This email or username is already registered",
    );
  }

  const data = await res.json();

  const access = data.access_token || data.access;
  const refresh = data.refresh_token || data.refresh;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");

  if (refresh !== null) {
    const res = await fetch(`${BASE_URL}/user/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      throw new Error("Refresh failed");
    }

    const data = await res.json();

    localStorage.setItem("access_token", data.access);

    return data.access;
  }
}

export async function updateProfilePicture(file: File) {
  const formData = new FormData();
  formData.append("icon", file);

  const res = await authFetch("/user/me/", {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update avatar");
  }

  return res.json();
}

export async function deleteProfilePicture() {
  const res = await authFetch("/user/me/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "icon": null }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete avatar");
  }

  return res.json();
}
