"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import CartItem from "@/components/Cart/CartItem";
import { useDispatch } from "react-redux";

const DELIVERY_FEE = 50;
const formatPrice = (price) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

const handleCheckout = () => {
  dispatch(clearCart());
  router.replace(`/order/${orderId}`);
  
};

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { t, i18n } = useTranslation("cart");
  const language = i18n.language || "en";
  const [deliveryOption, setDeliveryOption] = useState("self"); // "self" | "delivery"

  // Total bill: sum of line total per item (matches CartItem display)
  const totalBill = items.length
    ? items.reduce((sum, item) => {
        const unitPrice = item.price ?? 0;
        const qty = item.quantity ?? 1;
        const lineTotal = item.unit ? unitPrice : unitPrice * qty;
        return sum + lineTotal;
      }, 0)
    : 0;
  const deliveryFee = deliveryOption === "delivery" ? DELIVERY_FEE : 0;
  const finalTotal = totalBill + deliveryFee;
  const isEmpty = !items.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-white md:text-3xl">
        {t("title")}
      </h1>

      {isEmpty ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-lg text-white/70">{t("emptyTitle")}</p>
          <p className="mt-2 text-white/50">{t("emptyDescription")}</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-500"
          >
            {t("goToProducts")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="min-w-0 space-y-4" role="list">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.unit ?? "unit"}`}
                item={item}
                language={language}
              />
            ))}
          </ul>

          <div className="lg:sticky lg:top-24 lg:self-start rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="mb-3 text-sm font-medium text-white/80">
              {t("totalBill")}
            </p>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:bg-white/10">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="self"
                  checked={deliveryOption === "self"}
                  onChange={() => setDeliveryOption("self")}
                  className="h-4 w-4 accent-emerald-500"
                />
                <span className="text-white">{t("selfPickup")}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:bg-white/10">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={deliveryOption === "delivery"}
                  onChange={() => setDeliveryOption("delivery")}
                  className="h-4 w-4 accent-emerald-500"
                />
                <span className="text-white">{t("homeDelivery")}</span>
                <span className="ml-auto text-sm text-white/70">
                  + {formatPrice(DELIVERY_FEE)}
                </span>
              </label>
            </div>
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between text-white/80">
                <span>{t("subtotal")}</span>
                <span className="tabular-nums">{formatPrice(totalBill)}</span>
              </div>
              {deliveryOption === "delivery" && (
                <div className="flex justify-between text-white/80">
                  <span>{t("deliveryFee")}</span>
                  <span className="tabular-nums">
                    {formatPrice(DELIVERY_FEE)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-semibold text-white">
                <span>{t("finalTotal")}</span>
                <span className="tabular-nums text-emerald-400">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                handleCheckout();
              }}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-500"
            >
              {t("proceedToCheckout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
