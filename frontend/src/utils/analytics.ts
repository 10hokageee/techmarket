import { BASE_URL } from "@/api/configs";

export const analyticsEvent = async (event: string, params = {}) => {
  const payload = {
    event,
    ...params,
  };

  const res = await fetch(`${BASE_URL}/analytics/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
