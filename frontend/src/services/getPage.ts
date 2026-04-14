import type { Product } from "@/types/Product";
import { getData } from "@/utils/httpClient";

export const getItemsPage = (
  category: string, 
  page: number, 
  perPage: number, 
  filters: Record<string, string> = {}
) => {
  const queryParams = new URLSearchParams({
    categories: category,
    page: String(page),
    perPage: String(perPage),
    ...filters
  });

  return getData<Product[]>(`/products/?${queryParams.toString()}`);
};
