import type { Filter } from "@/types/Filter";
import type { Product } from "@/types/Product";

export const listByFilter = (products: Product[], selectedFilter: Filter) => {
  switch (selectedFilter) {
    case "inStock":
      return products.filter((product) => product.status);

    case "sale":
      return products.filter((product) => product.sale_price !== null);

    case "rated":
      return products.filter((product) => +product.rating_avg > 4.7);

    case "premium":
      return products.filter((product) => +product.original_price > 1000);

    default:
      return products;
  }
};
