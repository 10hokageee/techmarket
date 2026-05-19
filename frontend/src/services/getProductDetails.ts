import type { Product } from "@/types/Product";
import { getData } from "@/utils/httpClient";

export const getProductDetails = (id: number, color?: string) => {
  const query = color ? `?color=${color}` : '';
  return getData<Product>(`/market/products/${id}/${query}`);
};
