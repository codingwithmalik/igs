// src/store/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: "ORD-12345",
      status: "pending",
      createdAt: "2025-04-20T10:40:00Z",
      customer: {
        name: "John doe",
        phone: "03259884647",
        address: "Multan , pakistan",
      },
      paymentMethod: "cod",
      method: "pickup",
      items: [
        {
          productId: 2,
          name: { en: "Basmati Rice", ur: "chawal" },
          quantity: 2,
          price: 200,
          imageURL: "/Images/Products/Covers/Grains/rice.avif",
        },
        {
          productId: 1,
          name: { en: "Basmati Rice", ur: "chawal" },
          quantity: 4,
          price: 200,
          imageURL: "/Images/Products/Covers/Grains/rice.avif",
        },
      ],
      totals: {
        subtotal: 400,
        shippingCost: 200,
        total: 600,
      },
    },
  ],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus, deleteOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
