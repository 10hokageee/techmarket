import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/Product";

export interface CartItem extends Product {
  quanity: number;
}

type CartState = {
  products: CartItem[];
};

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.products.find((p) => p.id === product.id);

      if (existingItem) {
        existingItem.quanity += quantity;
      } else {
        state.products.push({ ...product, quanity: quantity });
      }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; d: number }>,
    ) => {
      const item = state.products.find((p) => p.id === action.payload.id);

      if (item) {
        const newQty = item.quanity + action.payload.d;

        if (newQty > 0) {
          item.quanity = newQty;
        }
      }
    },

    clearCart: (state, action: PayloadAction<[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, changeQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
