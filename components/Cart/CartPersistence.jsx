"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart ,clearCart } from "@/app/store/slices/cartSlice";

const CART_STORAGE_KEY = "igs_cart";

export default function CartPersistence() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) {
          dispatch(loadCart(parsed));
        }
      }
    } catch (e) {
      // ignore invalid or missing data
    }
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // ignore quota or other errors
    }
  }, [cart]);

  return null;
}

// export function CartClearance(){
//   //Empty cart in localstorage after check out
  
//     if (typeof window === "undefined") return;
//     try {
//       localStorage.removeItem(CART_STORAGE_KEY);
//       console.log("Data deleted")
//     } catch (e) {
//       // ignore invalid or missing data
//     }
// }