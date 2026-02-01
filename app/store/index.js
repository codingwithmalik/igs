import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js";
import productReducer from "./slices/productsSlice.js";
import orderReducer from "./slices/orderSlice.js";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    messages: messageReducer,
  },
});

export default store;
