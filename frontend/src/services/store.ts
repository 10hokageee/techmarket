import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/addToCart";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return undefined;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveState = (state: any) => {

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
    // eslint-disable-next-line no-empty
  } catch {}
};

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  
  preloadedState: {
    cart: loadState(),
  },
});

store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
