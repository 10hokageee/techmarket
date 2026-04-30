import { authFetch } from "./authFetch";

export const analyticsEvent = async (event: string, params = {}) => {
  const payload = {
    event,
    ...params,
  };

  const res = await authFetch(`/analytics/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
};
