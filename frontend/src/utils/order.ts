import { authFetch } from "@/utils/authFetch";

export async function order(items: { product: number; quantity: number }[]) {
  const res = await authFetch("/market/orders/", {
    method: "POST",
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    const errorMessage = errorData.items
      ? Object.values(errorData.items)[0]
      : "Order failed";

    throw new Error(errorMessage as string);
  }

  return res.json();
}

export async function getOrder(id: number) {
  const res = await authFetch(`/market/orders/${id}/`);

  if (!res.ok) {
    throw new Error("Failed to get order");
  }

  return res.json();
}

export async function getOrders(page: number, perPage: number) {
  const res = await authFetch(`/market/orders?page=${page}&perPage=${perPage}`);

  if (!res.ok) {
    throw new Error("Failed to get order");
  }

  return res.json();
}
