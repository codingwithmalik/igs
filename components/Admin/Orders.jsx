import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  setOrders,
  updateOrderStatus,
  deleteOrder,
} from "@/app/store/slices/orderSlice";
import { useDispatch } from "react-redux";
import OrderModal from "./OrderModal";
import { useTranslation } from "react-i18next";

const Orders = ({ getStatusColor, orders }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("admin/home");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Format date as YYYY-MM-DD
    const formattedDate = date.toLocaleDateString();

    // Format time as HH:MM (24-hour)
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} ${formattedTime}`;
  }
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);
  return (
    <div className="px-2 sm:px-4 lg:px-0">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {t("orders.orders")}
          </h2>
          <div className="flex items-center space-x-3 px-3 sm:px-4 py-2 border border-[#1f2a2d] rounded-lg bg-[#0f1415]">
            <select
              className="w-full sm:w-auto px-2 text-sm sm:text-base border-none focus:outline-none rounded-lg bg-[#0f1415] text-gray-100"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">{t("orders.allStatus")}</option>
              <option value="pending">{t("orders.statuses.pending")}</option>
              <option value="processing">
                {t("orders.statuses.processing")}
              </option>
              <option value="shipped">{t("orders.statuses.shipped")}</option>
              <option value="delivered">
                {t("orders.statuses.delivered")}
              </option>
              <option value="cancelled">
                {t("orders.statuses.cancelled")}
              </option>
            </select>
          </div>
        </div>
        {filteredOrders.length > 0 ? (
          <>
            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden lg:block bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0b0f10] border-b border-[#1f2a2d] text-center">
                    <tr className="text-center">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.orderId")}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.customer")}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.date")}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.items")}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.total")}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                        {t("orders.status")}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">
                        {t("orders.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2a2d] text-left">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-emerald-300 text-base">
                            {order.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white text-base">
                            {order.customer.name[i18n.language]}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {formatDateTime(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {order.items.length}
                        </td>
                        <td className="px-6 py-4 font-medium text-white text-base">
                          {order.totals.total} {t("orders.currency")}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`max-w-[120px] px-1 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <select
                              value={order.status}
                              onChange={(e) =>
                                dispatch(
                                  updateOrderStatus({
                                    orderId: order.id,
                                    newStatus: e.target.value,
                                  })
                                )
                              }
                              className={`px-2 rounded-full focus-within:outline-none outline-none border-none text-xs font-medium`}
                            >
                              <option className="bg-[#0f1415]" value="pending">
                                {t("orders.statuses.pending")}
                              </option>
                              <option
                                className="bg-[#0f1415]"
                                value="processing"
                              >
                                {t("orders.statuses.processing")}
                              </option>
                              <option className="bg-[#0f1415]" value="shipped">
                                {t("orders.statuses.shipped")}
                              </option>
                              <option
                                className="bg-[#0f1415]"
                                value="delivered"
                              >
                                {t("orders.statuses.delivered")}
                              </option>
                              <option
                                className="bg-[#0f1415]"
                                value="cancelled"
                              >
                                {t("orders.statuses.cancelled")}
                              </option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right justify-center items-center">
                          <button
                            onClick={() => dispatch(deleteOrder(order.id))}
                            className="p-2 hover:bg-rose-500/10 text-rose-300 rounded-lg border border-transparent hover:border-rose-500/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 hover:bg-emerald-500/10 text-emerald-300 rounded-lg border border-transparent hover:border-emerald-500/30"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View - Hidden on desktop */}
            <div className="lg:hidden space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-[#1f2a2d]">
                    <div className="flex-1">
                      <div className="font-medium text-emerald-300 text-sm mb-1">
                        {order.id}
                      </div>
                      <div className="text-white text-base font-medium">
                        {order.customer.name[i18n.language]}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => dispatch(deleteOrder(order.id))}
                        className="p-2 hover:bg-rose-500/10 text-rose-300 rounded-lg border border-transparent hover:border-rose-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-emerald-500/10 text-emerald-300 rounded-lg border border-transparent hover:border-emerald-500/30"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{t("orders.date")}:</span>
                      <span className="text-gray-300">
                        {formatDateTime(order.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        {t("orders.items")}:
                      </span>
                      <span className="text-gray-300">
                        {order.items.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        {t("orders.total")}:
                      </span>
                      <span className="text-white font-medium">
                        {order.totals.total} {t("orders.currency")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-gray-400">
                        {t("orders.status")}:
                      </span>
                      <div
                        className={`px-1 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <select
                          value={order.status}
                          onChange={(e) =>
                            dispatch(
                              updateOrderStatus({
                                orderId: order.id,
                                newStatus: e.target.value,
                              })
                            )
                          }
                          className={`px-2 py-1 rounded-full focus-within:outline-none outline-none border-none text-xs font-medium`}
                        >
                          <option className="bg-[#0f1415]" value="pending">
                            {t("orders.statuses.pending")}
                          </option>
                          <option className="bg-[#0f1415]" value="processing">
                            {t("orders.statuses.processing")}
                          </option>
                          <option className="bg-[#0f1415]" value="shipped">
                            {t("orders.statuses.shipped")}
                          </option>
                          <option className="bg-[#0f1415]" value="delivered">
                            {t("orders.statuses.delivered")}
                          </option>
                          <option className="bg-[#0f1415]" value="cancelled">
                            {t("orders.statuses.cancelled")}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] p-8 text-center text-gray-400">
            No orders yet
          </div>
        )}
      </div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
