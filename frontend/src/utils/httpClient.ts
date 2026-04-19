import { BASE_URL } from "../api/configs";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then((res) => {
    return res.json();
  });
}

export async function postData<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  return res.json();
}