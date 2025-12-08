"use client";
import ProductModal from "@/components/Admin/ProductModal.jsx";
import React, { useState } from "react";
import Orders from "@/components/Admin/Orders.jsx";
import Products from "@/components/Admin/Products.jsx";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  AlertCircle,
  BarChart3,
  Settings,
  Bell,
  Menu,
  Inbox,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function AdminDashboard() {
  const { t , i18n } = useTranslation("admin/home");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: { en: "Basmati Rice", ur: "باسمتی چاول" },
      price: 200,
      description: {
        en: "Long-grain aromatic rice perfect for daily meals and special dishes.",
        ur: "روزمرہ کے کھانوں اور خاص پکوانوں کے لیے لمبے دانے والے خوشبودار چاول۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "Royal Harvest", ur: "رائل ہارویسٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 2,
      name: { en: "Whole Wheat Flour", ur: "مکمل گندم کا آٹا" },
      price: 50,
      description: {
        en: "High-quality whole wheat flour ideal for baking and chapatis.",
        ur: "بیکنگ اور چپاتیوں کے لیے اعلیٰ معیار کا مکمل گندم کا آٹا۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "GrainMill", ur: "گرین مل" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
    {
      id: 3,
      name: { en: "Rolled Oats", ur: "رولڈ اوٹس" },

      price: 9000,
      description: {
        en: "Nutritious rolled oats great for breakfast bowls and baking.",
        ur: "غذائیت سے بھرپور رولڈ اوٹس جو ناشتے کے پیالوں اور بیکنگ کے لیے بہترین ہیں۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "OatVille", ur: "اوٹ ویل" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 4,
      name: { en: "Quinoa", ur: "کینوا" },
      price: 230,
      description: {
        en: "Protein-rich white quinoa, perfect for salads and healthy meals.",
        ur: "پروٹین سے بھرپور سفید کینوا، سلاد اور صحت مند کھانوں کے لیے بہترین۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "NutriSeed", ur: "نیوٹری سیڈ" },
      isAvailable: false,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
    {
      id: 5,
      name: { en: "Cornmeal", ur: "کارن میل" },
      price: 340,
      description: {
        en: "Finely ground cornmeal suitable for cornbread and crusts.",
        ur: "باریک پیسا ہوا کارن میل جو کارن بریڈ اور کرسٹ کے لیے موزوں ہے۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "GoldenCorn", ur: "گولڈن کارن" },
      isNumerical: true,
      isAvailable: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 6,
      name: { en: "Brown Rice", ur: "براؤن چاول" },
      price: 100,
      description: {
        en: "Fiber-rich whole grain brown rice for healthier meals.",
        ur: "فائبر سے بھرپور مکمل اناج براؤن چاول صحت مند کھانوں کے لیے۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "EarthyFarm", ur: "ارتھی فارم" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
    {
      id: 7,
      name: { en: "Barley", ur: "جو" },
      price: 725,
      description: {
        en: "Whole barley grains perfect for soups, salads, and porridge.",
        ur: "پورے جو کے دانے جو سوپ، سلاد، اور دلیہ کے لیے بہترین ہیں۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "BarleyCo", ur: "بارلی کو" },
      isNumerical: true,
      isAvailable: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 8,
      name: { en: "Millet", ur: "باجرا" },
      price: 650,
      description: {
        en: "Nutrient-rich millet used in traditional dishes and healthy recipes.",
        ur: "روایتی کھانوں اور صحت مند ترکیبوں میں استعمال ہونے والا غذائیت سے بھرپور باجرا۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "GreenFields", ur: "گرین فیلڈز" },
      isAvailable: false,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
    {
      id: 9,
      name: { en: "Sorghum (Jowar)", ur: "جوار" },
      price: 950,
      description: {
        en: "Gluten-free whole sorghum grains ideal for flour and porridges.",
        ur: "گلوٹین سے پاک پورے جوار کے دانے جو آٹے اور دلیہ کے لیے مثالی ہیں۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "HealthyHarvest", ur: "ہیلتھی ہارویسٹ" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/banaspati-rice.avif",
    },
    {
      id: 10,
      name: { en: "Couscous", ur: "کوسکوس" },
      price: 110,
      description: {
        en: "Quick-cooking couscous made from semolina wheat.",
        ur: "سمولینا گندم سے بنایا گیا جلد پکنے والا کوسکوس۔",
      },
      category: { en: "Grains", ur: "اناج" },
      brand: { en: "GoldenGrain", ur: "گولڈن گرین" },
      isAvailable: true,
      isNumerical: true,
      imageURL: "/Images/Products/Covers/Grains/rice.avif",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "#ORD-001",
      customer: "John Doe",
      total: 289.97,
      status: "pending",
      date: "2024-12-05",
      items: 3,
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      total: 149.99,
      status: "shipped",
      date: "2024-12-04",
      items: 2,
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      total: 89.99,
      status: "delivered",
      date: "2024-12-03",
      items: 1,
    },
    {
      id: "#ORD-004",
      customer: "Sarah Williams",
      total: 449.97,
      status: "processing",
      date: "2024-12-05",
      items: 4,
    },
  ]);
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-500 text-amber-300 border border-amber-500/40",
      processing: "bg-sky-500/10 text-sky-300 border border-sky-500/40",
      shipped: "bg-violet-500/10 text-violet-300 border border-violet-500/40",
      delivered:
        "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
      cancelled: "bg-rose-500/10 text-rose-300 border border-rose-500/40",
      true: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
      false: "bg-rose-500/10 text-rose-300 border border-rose-500/40",
    };
    return colors[status] || "bg-white/5 text-gray-200 border border-white/10";
  };

  const stats = [
    {
      label: "Total Revenue",
      value: "$12,486",
      change: "+12.5%",
      icon: DollarSign,
      color: "sky",
    },
    {
      label: "Orders",
      value: "143",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "emerald",
    },
    {
      label: "Products",
      value: "287",
      change: "+3.1%",
      icon: Package,
      color: "violet",
    },
    {
      label: "Customers",
      value: "1,249",
      change: "+15.3%",
      icon: Users,
      color: "amber",
    },
  ];

  const statColors = {
    sky: { iconBg: "bg-sky-500/10", iconText: "text-sky-300" },
    emerald: { iconBg: "bg-emerald-500/10", iconText: "text-emerald-300" },
    violet: { iconBg: "bg-violet-500/10", iconText: "text-violet-300" },
    amber: { iconBg: "bg-amber-500/10", iconText: "text-amber-300" },
  };

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p
        )
      );
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };
  console.log();
  return (
    <div className="min-h-screen bg-linear-to-br from-[#171d1e] via-[#1b2426] to-[#0f1415] text-gray-100">
      {/* Header */}
      <header className="bg-[#0f1415]/80 border-b border-[#1f2a2d] backdrop-blur sticky top-0 md:z-100 z-40">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-[#1f2a2d] transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-300" />
              </button>

              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">
                  {t("header.title")}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center bg-[#0b0f10] border border-[#1f2a2d] rounded-lg px-4 py-2 shadow-inner shadow-black/30">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder={t("header.searchplaceholder")}
                  className="bg-transparent border-none outline-none text-sm w-48 lg:w-64 placeholder-gray-500 text-gray-100"
                />
              </div>
              <button className="relative p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-[#1f2a2d] transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
            </div>
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
              {
                id: "products",
                label: t("sidebar.products"),
                icon: Package,
              },
              {
                id: "orders",
                label: t("sidebar.orders"),
                icon: ShoppingCart,
              },
              { id: "inbox", label: t("sidebar.inbox"), icon: Inbox },
              {
                id: "analytics",
                label: t("sidebar.analytics"),
                icon: TrendingUp,
              },
              {
                id: "settings",
                label: t("sidebar.settings"),
                icon: Settings,
              },
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
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Dashboard 
                </h2>
                <div className="text-xs sm:text-sm text-gray-400">
                  Last updated: 2 mins ago
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0f1415] rounded-xl p-4 sm:p-6 border border-[#1f2a2d] shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          statColors[stat.color]?.iconBg || "bg-emerald-500/10"
                        }`}
                      >
                        <stat.icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            statColors[stat.color]?.iconText ||
                            "text-emerald-300"
                          }`}
                        />
                      </div>
                      <span className="text-emerald-300 text-xs sm:text-sm font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders & Not Available Products */}
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
                            {order.customer}
                          </div>
                        </div>
                        <div className="text-right ml-2 shrink-0">
                          <div className="font-medium text-white text-sm sm:text-base">
                            ${order.total}
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
            <Products
              products={products}
              setEditingProduct={setEditingProduct}
              setShowProductModal={setShowProductModal}
              getStatusColor={getStatusColor}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProduct}
            />
          )}

          {activeTab === "orders" && (
            <Orders
              getStatusColor={getStatusColor}
              orders={orders}
              setOrders={setOrders}
            />
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
