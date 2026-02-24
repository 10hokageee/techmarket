export type Product = {
  id: number;
  name: string;
  category: string;
  series: string;
  image: string | null;
  stock_quantity: number;
  original_price: string;
  sale_price: string | null;
  description: string;
  status: string;
  reviews: number;
  rating_avg: string;
};
