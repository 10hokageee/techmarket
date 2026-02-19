import { BASE_URL } from "../api/configs";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then((res) => {
    return res.json();
  });
}
