import React from "react";
// import { useState } from "react";
const Orders = ({getStatusColor , orders, setOrders}) => {

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Orders</h2>
          <div className="flex items-center space-x-3">
            <select className="w-full sm:w-auto px-4 py-2 border border-[#1f2a2d] rounded-lg bg-[#0f1415] text-gray-100">
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#0b0f10] border-b border-[#1f2a2d]">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Customer
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200 hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200 hidden sm:table-cell">
                    Items
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Total
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2a2d]">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="font-medium text-emerald-300 text-sm sm:text-base">
                        {order.id}
                      </div>
                      <div className="text-xs text-gray-400 md:hidden mt-1">
                        {order.date}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-white text-sm sm:text-base">
                        {order.customer}
                      </div>
                      <div className="text-xs text-gray-400 sm:hidden mt-1">
                        {order.items} items
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden md:table-cell">
                      {order.date}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden sm:table-cell">
                      {order.items}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-white text-sm sm:text-base">
                      ${order.total}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`px-1 sm:px-3 py-1 rounded-full text-xs font-medium bg-transparent ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <button className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
