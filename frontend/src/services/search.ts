import type { Product } from "@/types/Product";
import { getData } from "../utils/httpClient";

export const searchProducts = (
  query: string,
  page: number,
  perPage: number,
  filters: Record<string, string> = {},
) => {
  const queryParams = new URLSearchParams({
    search: query,
    page: String(page),
    perPage: String(perPage),
    ...filters,
  });

  return getData<Product[]>(
    `/market/products/?${queryParams.toString()}`,
  );
};

export const search = (query: string) => {
  return getData<Product[]>(
    `/market/products/?search=${query}`,
  );
};
