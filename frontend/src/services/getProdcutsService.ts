import type { Product } from "../types/Product";
import { getData } from "../utils/httpClient";

// export function getProducts() {
//   return getData<Product[]>("/products/");
// }

export function getProducts() {
  return getData<Product[]>("/products/");
}
