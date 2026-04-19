export interface CartItem {
  id: number;
  product: string;
  quantity: number;
  unit_price: string; 
  price: string;
}

export type Order = {
  id: number;
  items: CartItem[];
  payment_status: 'UNPAID' | 'PAID' | 'CANCELED';
  total_amount: string;
  payment_url: string;
  receipt?: string; 
}