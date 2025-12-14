// components/Admin/OrderDetailsModal.jsx
"use client";

import React from "react";
import { X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const OrderModal = ({ order, onClose }) => {
  if (!order) return null;
  const { t, i18n } = useTranslation("admin/home");

  return (
    <div className="fixed inset-0 z-101 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-[#0f1415] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative transform transition-transform duration-300 scale-100 sm:scale-100">
        {/* Header with Close & Delete */}
        <div className="flex justify-between items-center bg-[#0b0f10] px-6 py-4 border-b border-[#1f2a2d]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {t("ordermodal.orderDetails")}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-xs font-semibold">
                {t("ordermodal.orderId")}
              </p>
              <p className="text-white font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold">
                {t("ordermodal.status")}
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${order.status}`}
                style={{
                  backgroundColor:
                    order.status === "pending"
                      ? "rgba(250,204,21,0.2)"
                      : order.status === "processing"
                      ? "rgba(56,189,248,0.2)"
                      : order.status === "shipped"
                      ? "rgba(139,92,246,0.2)"
                      : order.status === "delivered"
                      ? "rgba(5,150,105,0.2)"
                      : "rgba(239,68,68,0.2)",
                  color:
                    order.status === "pending"
                      ? "#facc15"
                      : order.status === "processing"
                      ? "#38bdf8"
                      : order.status === "shipped"
                      ? "#8b5cf6"
                      : order.status === "delivered"
                      ? "#059669"
                      : "#ef4444",
                }}
              >
                {t(`ordermodal.statuses.${order.status}`)}
              </p>
            </div>
          </div>
          {/* Customer Info */}
          <div className="bg-[#0b0f10] rounded-xl p-4 space-y-2">
            <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
              {t("ordermodal.customerInfo")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-200 text-sm">
              <p>
                <span className="font-semibold text-gray-400">
                  {t("ordermodal.name")}:
                </span>
                {order.customer.name[i18n.language]}
              </p>
              <p>
                <span className="font-semibold text-gray-400">
                  {t("ordermodal.phone")}:
                </span>
                {order.customer.phone}
              </p>
              <p>
                <span className="font-semibold text-gray-400">
                  {t("ordermodal.address")}:
                </span>
                {order.customer.address[i18n.language]}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="bg-[#0b0f10] rounded-xl p-4">
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
              {t("ordermodal.items")}
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#171d1e] rounded-lg p-3 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.imageURL}
                      alt={item.name[i18n.language]}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="text-gray-200">
                      <p className="font-medium">{item.name[i18n.language]}</p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {t("ordermodal.quantity")}: {item.quantity} |{" "}
                        {t("ordermodal.currency")} {item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-white">
                    {t("ordermodal.currency")} {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0b0f10] rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                {t("ordermodal.paymentMethod")}
              </h3>
              <p className="text-gray-200">
                {order.paymentMethod === "cod"
                  ? t("ordermodal.paymentmethods.cod")
                  : ""}
              </p>
            </div>
            <div className="bg-[#0b0f10] rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                {t("ordermodal.deliveryPickup")}
              </h3>
              {order.method === "pickup" ? (
                <p className="text-gray-200">
                  {t("ordermodal.methods.pickup")}
                </p>
              ) : (
                <p className="text-gray-200">
                  {t("ordermodal.methods.delivery")}
                </p>
              )}
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-200">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">
                {t("ordermodal.subtotal")}
              </p>
              <p className="text-white font-medium">
                {t("ordermodal.currency")} {order.totals.subtotal}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">
                {t("ordermodal.shipping")}
              </p>
              <p className="text-white font-medium">
                {t("ordermodal.currency")} {order.totals.shippingCost}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">
                {t("ordermodal.total")}
              </p>
              <p className="text-white font-bold text-lg">
                {t("ordermodal.currency")} {order.totals.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
