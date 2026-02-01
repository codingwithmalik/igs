"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/slices/cartSlice";
import { Plus, Minus, ShoppingCart, Package } from "lucide-react";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const { t, i18n } = useTranslation("products/products");
  const dispatch = useDispatch();
  const language = i18n.language || "en";
  const isRTL = language === "ur";

  // State for numerical products (quantity)
  const [quantity, setQuantity] = useState(1);

  // State for non-numerical products (unit: 'gram' or 'kilogram')
  const [selectedUnit, setSelectedUnit] = useState("kilogram");

  // State for non-numerical products (amount/quantity)
  const [amount, setAmount] = useState(1);

  // Get product name based on language
  const productName = product.name?.[language] || product.name?.en || "Product";
  const productDescription =
    product.description?.[language] || product.description?.en || "";
  const brandName = product.brand?.[language] || product.brand?.en || "";

  // Handle quantity increase
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle manual quantity input change for numerical products
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow empty string for editing, or positive integers
    if (value === "") {
      setQuantity("");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 1) {
        setQuantity(numValue);
      }
    }
  };

  // Handle quantity input blur - ensure minimum value of 1
  const handleQuantityBlur = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) < 1 || isNaN(parseInt(value))) {
      setQuantity(1);
    }
  };

  // Calculate price based on product type
  const calculatePrice = () => {
    if (product.isNumerical) {
      return product.price * quantity;
    } else {
      // For non-numerical products, price is per gram
      // Convert amount to grams if kilogram is selected
      const amountInGrams = (
        selectedUnit === "kilogram" ? amount : amount / 1000
      ).toFixed(2);
      return product.price * amountInGrams;
    }
  };
  const calculateCartPrice = () => {
    if (product.isNumerical) {
      return product.price;
    } else {
      // For non-numerical products, price is per gram
      // Convert amount to grams if kilogram is selected
      const amountInGrams = (
        selectedUnit === "kilogram" ? amount : amount / 1000
      ).toFixed(2);
      return product.price * amountInGrams;
    }
  };

  // Handle amount input change for non-numerical products
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only positive numbers
    if (value === "" || (parseFloat(value) >= 0 && !isNaN(value))) {
      setAmount(value === "" ? "" : parseFloat(value) || 0);
    }
  };

  // Format price in PKR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Validate amount for non-numerical products
    if (!product.isNumerical && (!amount || amount <= 0)) {
      toast.error(t("enterValidAmount") || "Please enter a valid amount", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: productName,
      price: calculateCartPrice(),
      quantity: product.isNumerical ? quantity : amount,
      unit: product.isNumerical ? null : selectedUnit,
      imageURL: product.imageURL,
      productData: product,
    };

    dispatch(addToCart(itemToAdd));

    const amountDisplay = product.isNumerical
      ? `${quantity} ${t("pieces") || "pieces"}`
      : `${amount} ${selectedUnit === "kilogram" ? "kg" : "g"}`;

    toast.success(`${productName} (${amountDisplay}) added to cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Show out of stock overlay if product is unavailable
  if (!product.isAvailable) {
    return (
      <div
        className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#468759]/20 bg-linear-to-br from-[#1a2324] to-[#171d1e] shadow-lg opacity-60 transition-all duration-300 group hover:shadow-xl hover:shadow-[#468759]/10 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div className="relative w-full shrink-0 overflow-hidden bg-[#2a3334] aspect-4/3 sm:aspect-square md:aspect-4/3 lg:aspect-5/4">
          <Image
            src={product.imageURL || "/items.jpg"}
            alt={productName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 384px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 320px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#171d1e]/70">
            <span className="rounded-lg bg-[#dc2626]/90 px-3 py-2 text-sm font-semibold text-white sm:px-4 sm:text-base">
              {t("outOfStock") || "Out of Stock"}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
            {productName}
          </h3>
          {brandName && (
            <p className="mb-2 text-xs text-gray-400 sm:text-sm md:text-base">
              {brandName}
            </p>
          )}
          <p className="mb-3 line-clamp-2 text-xs text-gray-500 sm:text-sm md:mb-4 md:text-base">
            {productDescription}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-[#2ecb5d] sm:text-xl md:text-2xl lg:text-3xl">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#468759]/20 bg-linear-to-br from-[#1a2324] to-[#171d1e] shadow-lg transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#468759]/20 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full shrink-0 overflow-hidden bg-[#2a3334] aspect-4/3 sm:aspect-square md:aspect-4/3 lg:aspect-5/4">
        <Image
          src={product.imageURL || "/items.jpg"}
          alt={productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 384px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 320px"
        />
      </div>

      {/* Product Info */}
      <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-5 lg:p-6">
        {/* Brand */}
        {brandName && (
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-[#468759]" />
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              {brandName}
            </p>
          </div>
        )}

        {/* Product Name */}
        <h3 className="mb-2 line-clamp-2 min-h-10 text-base font-bold text-white sm:min-h-12 sm:text-lg md:text-xl lg:text-2xl">
          {productName}
        </h3>

        {/* Description */}
        <p className="mb-3 line-clamp-2 min-h-8 text-xs text-gray-400 sm:min-h-10 sm:text-sm md:mb-4 md:text-base">
          {productDescription}
        </p>

        {/* Price Display */}
        {product.isNumerical ? (
          <div className="mb-3 md:mb-4">
            <p className="mb-1 text-xs text-gray-500 sm:text-sm">
              {t("pricePerPiece") || "Price per piece"}
            </p>
            <span className="text-xl font-bold text-[#2ecb5d] sm:text-2xl md:text-3xl lg:text-4xl">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
        ) : null}

        {/* Numerical Product Controls */}
        {product.isNumerical ? (
          <div className="mt-auto space-y-3 sm:space-y-4">
            {/* Quantity Selector - touch-friendly on mobile */}
            <div className="flex items-center justify-between gap-1 rounded-lg border border-[#468759]/30 bg-[#2a3334] p-1.5 sm:p-2">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="min-h-11 min-w-11 rounded-lg bg-[#1a2324] p-2 text-[#2ecb5d] transition-all duration-200 hover:bg-[#468759] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:min-w-0"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                className="w-14 flex-1 bg-transparent px-1 text-center text-base font-semibold text-white outline-none [appearance:textfield] focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:w-16 sm:text-lg md:w-20 md:text-xl"
                aria-label="Quantity"
              />
              <button
                onClick={handleIncrease}
                className="min-h-11 min-w-11 rounded-lg bg-[#1a2324] p-2 text-[#2ecb5d] transition-all duration-200 hover:bg-[#468759] hover:text-white sm:min-h-0 sm:min-w-0"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>



            {/* Add to Cart Button - touch-friendly */}
            <button
              onClick={handleAddToCart}
              className="flex w-full min-h-11ms-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#2ecb5d] to-[#0dd045] py-3 font-semibold text-[#171d1e] shadow-lg shadow-[#2ecb5d]/30 transition-all duration-300 hover:from-[#0dd045] hover:to-[#2ecb5d] hover:shadow-xl hover:shadow-[#2ecb5d]/50 active:scale-[0.98] sm:min-h-0 sm:py-3.5 sm:hover:scale-[1.02]"
            >
              <ShoppingCart className="h-5 w-5 shrink-0" />
              <span className="text-sm sm:text-base">
                {t("addToCart") || "Add to Cart"}
              </span>
            </button>
          </div>
        ) : (
          /* Non-Numerical Product Controls */
          <div className="mt-auto space-y-3 sm:space-y-4">
            {/* Unit Selection */}
            <div className="rounded-lg border border-[#468759]/30 bg-[#2a3334] p-2">
              <p className="mb-2 px-2 text-xs text-gray-400 sm:text-sm">
                {t("selectUnit") || "Select Unit"}
              </p>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <button
                  onClick={() => {
                    setSelectedUnit("kilogram");
                    if (!amount || amount <= 0) setAmount(1);
                  }}
                  className={`min-h-11 rounded-lg px-2 py-2.5 font-medium transition-all duration-200 sm:min-h-0 sm:px-4 sm:py-3 sm:text-base ${
                    selectedUnit === "kilogram"
                      ? "bg-[#2ecb5d] text-[#171d1e] shadow-lg shadow-[#2ecb5d]/30"
                      : "border border-[#468759]/20 bg-[#1a2324] text-sm text-gray-300 hover:bg-[#3a4546]"
                  }`}
                >
                  {t("kilogram") || "Kilogram (kg)"}
                </button>
                <button
                  onClick={() => {
                    setSelectedUnit("gram");
                    if (!amount || amount <= 0) setAmount(1);
                  }}
                  className={`min-h-11nded-lg px-2 py-2.5 font-medium transition-all duration-200 sm:min-h-0 sm:px-4 sm:py-3 sm:text-base ${
                    selectedUnit === "gram"
                      ? "bg-[#2ecb5d] text-[#171d1e] shadow-lg shadow-[#2ecb5d]/30"
                      : "border border-[#468759]/20 bg-[#1a2324] text-sm text-gray-300 hover:bg-[#3a4546]"
                  }`}
                >
                  {t("gram") || "Gram (g)"}
                </button>
              </div>
            </div>

            {/* Amount Input and Price Display */}
            <div className="rounded-lg border border-[#468759]/30 bg-[#2a3334] p-2.5 sm:p-3 md:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {/* Amount Input */}
                <div className="min-w-0 flex-1">
                  <label className="mb-1.5 block text-xs text-gray-400 sm:text-sm">
                    {t("enterAmount") || "Enter Amount"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step={selectedUnit === "kilogram" ? "0.1" : "1"}
                      value={amount}
                      onChange={handleAmountChange}
                      className="min-h-11 w-full rounded-lg border border-[#468759]/30 bg-[#1a2324] px-3 py-2 text-sm text-white transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2ecb5d] sm:min-h-0 sm:px-4 sm:py-2.5 sm:text-base"
                      placeholder="0"
                    />
                    <span className="shrink-0 text-sm font-medium text-gray-300 sm:text-base">
                      {selectedUnit === "kilogram" ? "kg" : "g"}
                    </span>
                  </div>
                </div>

                {/* Calculated Price */}
                <div className="shrink-0 sm:text-right">
                  <label className="mb-1.5 block text-xs text-gray-400 sm:text-sm">
                    {t("total") || "Total"}
                  </label>
                  <div className="text-base font-bold text-[#2ecb5d] sm:text-lg md:text-xl lg:text-2xl">
                    {amount && amount > 0
                      ? formatPrice(calculatePrice())
                      : formatPrice(0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button - touch-friendly */}
            <button
              onClick={handleAddToCart}
              disabled={!amount || amount <= 0}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#2ecb5d] to-[#0dd045] py-3 font-semibold text-[#171d1e] shadow-lg shadow-[#2ecb5d]/30 transition-all duration-300 hover:from-[#0dd045] hover:to-[#2ecb5d] hover:shadow-xl hover:shadow-[#2ecb5d]/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none sm:min-h-0 sm:py-3.5 sm:hover:scale-[1.02]"
            >
              <ShoppingCart className="h-5 w-5 shrink-0" />
              <span className="text-sm sm:text-base">
                {t("addToCart") || "Add to Cart"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
