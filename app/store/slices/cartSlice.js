import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      // Check if item with same id and unit already exists
      const existingItemIndex = state.items.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.unit === item.unit
      );

      if (existingItemIndex !== -1) {
        // If item exists, update quantity and price
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity += item.quantity || 1;
        existingItem.price = item.price; // Update to latest price
      } else {
        // If item doesn't exist, add new item
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => {
        // If action.payload is an object with id and unit, match both
        if (typeof action.payload === "object") {
          return !(
            item.id === action.payload.id &&
            item.unit === action.payload.unit
          );
        }
        // Otherwise, match by id only
        return item.id !== action.payload;
      });

      // Recalculate totals
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    },

    updateCartItemQuantity(state, action) {
      const { id, unit, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.unit === unit
      );

      if (item && quantity > 0) {
        item.quantity = quantity;
        // Recalculate totals
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
      } else if (item && quantity <= 0) {
        // Remove item if quantity is 0 or less
        state.items = state.items.filter(
          (cartItem) =>
            !(cartItem.id === id && cartItem.unit === unit)
        );
        // Recalculate totals
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    loadCart(state, action) {
      const payload = action.payload;
      if (payload && Array.isArray(payload.items)) {
        state.items = payload.items;
        state.totalQuantity = payload.totalQuantity ?? 0;
        state.totalPrice = payload.totalPrice ?? 0;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;
export default cartSlice.reducer;
