export type Product = {
  id: number;
  name: string;
  category: string;
  series: string;
  image: string | null;
  stock_quantity: number;
  original_price: string;
  sale_price: string;
  characteristics: {
    functions: string;
    interface: string;
    compatibility: string;
  };
  color: string;
  description: string;
  status: boolean;
  reviews: number;
  rating_avg: string;
};
