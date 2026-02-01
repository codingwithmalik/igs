"use client";
import React, { useState } from "react";
import Orders from "@/components/Admin/Orders.jsx";
import Products from "@/components/Admin/Products.jsx";
import InboxSection from "@/components/Admin/InboxSection.jsx";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  AlertCircle,
  BarChart3,
  Bell,
  Menu,
  Inbox,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const { t, i18n } = useTranslation("admin/home");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redux selectors
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders);
  const messages = useSelector((state) => state.messages.messages);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
      processing: "bg-sky-500/20 text-sky-300 border border-sky-500/40",
      shipped: "bg-violet-500/20 text-violet-300 border border-violet-500/40",
      delivered:
        "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
      cancelled: "bg-rose-500/20 text-rose-300 border border-rose-500/40",
      true: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
      false: "bg-rose-500/10 text-rose-300 border border-rose-500/40",
    };
    return colors[status] || "bg-white/5 text-gray-200 border border-white/10";
  };

  // Compute dynamic stats
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totals.total,
    0
  );
  const unreadMessages = messages.filter((m) => !m.read).length;

  const stats = [
    {
      label: t("stats.totalRevenue"),
      value: `${totalRevenue.toLocaleString()}`,
      currency: "PKR",
      color: "sky",
    },
    {
      label: t("stats.orders"),
      value: orders.length,
      icon: ShoppingCart,
      color: "emerald",
    },
    {
      label: t("stats.products"),
      value: products.length,
      icon: Package,
      color: "violet",
    },
  ];

  const statColors = {
    sky: { iconBg: "bg-sky-500/10", iconText: "text-sky-300" },
    emerald: { iconBg: "bg-emerald-500/10", iconText: "text-emerald-300" },
    violet: { iconBg: "bg-violet-500/10", iconText: "text-violet-300" },
    amber: { iconBg: "bg-amber-500/10", iconText: "text-amber-300" },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#171d1e] via-[#1b2426] to-[#0f1415] text-gray-100">
      {/* Header */}
      <header className="bg-[#0f1415]/80 border-b border-[#1f2a2d] backdrop-blur sticky top-0 md:z-100 z-40">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-[#1f2a2d]"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            <h1 className="text-lg sm:text-2xl font-bold text-white">
              {t("header.title")}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center bg-[#0b0f10] border border-[#1f2a2d] rounded-lg px-4 py-2 shadow-inner shadow-black/30">
              <Search
                className={`w-5 h-5 text-gray-500 ${
                  i18n.language === "en" ? "mr-2" : "ml-2"
                }`}
              />
              <input
                type="text"
                placeholder={t("header.searchplaceholder")}
                className="bg-transparent border-none outline-none text-sm w-48 lg:w-64 placeholder-gray-500 text-gray-100"
              />
            </div>
            <button className="relative p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-[#1f2a2d] transition-colors">
              <Bell className="w-5 h-5 text-gray-300" />
              {unreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0b0f10]/95 border-r border-[#1f2a2d] backdrop-blur z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-1">
            {[
              {
                id: "dashboard",
                label: t("sidebar.dashboard"),
                icon: BarChart3,
              },
              { id: "products", label: t("sidebar.products"), icon: Package },
              { id: "orders", label: t("sidebar.orders"), icon: ShoppingCart },
              { id: "inbox", label: t("sidebar.inbox"), icon: Inbox },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors border ${
                  activeTab === item.id
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                    : "text-gray-300 border-transparent hover:bg-white/5 hover:border-[#1f2a2d]"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 w-full min-w-0">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0f1415] rounded-xl p-4 sm:p-6 border border-[#1f2a2d] shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          statColors[stat.color]?.iconBg
                        }`}
                      >
                        {stat.icon ? (
                          <stat.icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              statColors[stat.color]?.iconText
                            }`}
                          />
                        ) : (
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              statColors[stat.color]?.iconText
                            }`}
                          >
                            {stat.currency}
                          </div>
                        )}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders & Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-[#0f1415] rounded-xl p-4 sm:p-6 border border-[#1f2a2d] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">
                    Recent Orders
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-2 sm:p-3 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-white text-sm sm:text-base truncate">
                            {order.id}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400 truncate">
                            {order.customer.name}
                          </div>
                        </div>
                        <div className="text-right ml-2 shrink-0">
                          <div className="font-medium text-white text-sm sm:text-base">
                            ${order.totals.total}
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0f1415] rounded-xl p-4 sm:p-6 border border-[#1f2a2d] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center text-white">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-400" />
                    Products Not Available
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {products
                      .filter((p) => !p.isAvailable)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-2 sm:p-3 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <span className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                              <Image
                                src={product.imageURL}
                                alt={product.name[i18n.language]}
                                fill
                                className="object-cover rounded-md"
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-white text-sm sm:text-base truncate">
                                {product.name[i18n.language]}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-400 truncate">
                                {product.category[i18n.language]}
                              </div>
                            </div>
                          </div>
                          <div className="text-orange-300 font-medium text-sm sm:text-base ml-2 shrink-0">
                            {product.isAvailable ? "Available" : "Unavailable"}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <Products products={products} getStatusColor={getStatusColor} />
          )}

          {activeTab === "orders" && (
            <Orders getStatusColor={getStatusColor} orders={orders} />
          )}

          {activeTab === "inbox" && <InboxSection />}
        </main>
      </div>
    </div>
  );
}
