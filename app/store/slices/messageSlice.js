// app/store/slices/messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Order issue",
      message: "I haven't received my order.",
      date: "2025-12-14",
      read: false,
    },
    {
      id: 2,
      name: "Sarah Ali",
      email: "sarah@gmail.com",
      subject: "Bulk purchase",
      message: "Do you offer discounts?",
      date: "2025-12-13",
      read: false,
    },
  ],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    markRead: (state, action) => {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.read = true;
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { markRead, deleteMessage, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
