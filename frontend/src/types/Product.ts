export type Product = {
  id: number;
  name: string;
  category: string;
  series: string;
  stock_quantity: number;
  original_price: string;
  sale_price: string;
  characteristics: {
    Type: string;
    InkSystem: string;
    Resolution: string;
    PaperTrays: string;
    PrintSpeed: string;
    Connectivity: string;
    MaxPrintWidth: string;
    BorderlessPrinting: string;
  };
  colors: string[];
  description: string;
  reviews: number;
  rating_avg: string;
  status: boolean;
  images: string[];
  current_color: string;
};