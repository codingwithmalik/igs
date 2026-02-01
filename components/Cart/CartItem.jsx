"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { removeFromCart } from "@/app/store/slices/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

const CartItem = ({ item, language }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("cart");

  const handleRemove = () => {
    dispatch(removeFromCart({ id: item.id, unit: item.unit }));
  };
  // Use productData for name/brand in current language (proper product translations)
  const name =
    item.productData?.name?.[language] ||
    item.productData?.name?.en ||
    item.name ||
    t("product");
  const brand = item.productData?.brand?.[language] || item.productData?.brand?.en || "";
  const unit = item.unit || item.productData?.unit;
  const price =  unit ?  (item.price) : (item.price * item.quantity);
  const imageURL = item.imageURL || item.productData?.imageURL;
  const quantity = item.quantity ?? 1;

  return (
    <li className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/10 sm:h-24 sm:w-24">
        {imageURL ? (
          <Image src={imageURL} alt={name} fill className="object-cover" sizes="96px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
            {t("noImage")}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white">{name}</h3>
        {brand && (
          <p className="text-sm text-white/70">
            {t("brand")}: {brand}
          </p>
        )}
        <p className="text-xs text-white/50">
          {t("qty")}: {quantity} {unit}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-right font-semibold text-emerald-400">
          {formatPrice(price)}
        </span>
        <button
          type="button"
          onClick={handleRemove}
          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          aria-label={t("remove")}
          title={t("remove")}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
