import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/app/store/slices/productsSlice";
import { useDispatch } from "react-redux";

const Products = ({ products, getStatusColor }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation("admin/home");
  const [expandedRows, setExpandedRows] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const isRTL = i18n.language === "ur";

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      dispatch(updateProduct({ ...product, id: editingProduct.id }));
    } else {
      dispatch(addProduct({ ...product, id: uuidv4() }));
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };
  const toggleRow = (productId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div
      className={`px-2 sm:px-4 lg:px-0 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {t("products.title")}
          </h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            className={`flex items-center justify-center ${
              isRTL ? "space-x-reverse space-x-2" : "space-x-2"
            } bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 w-full sm:w-auto font-medium`}
          >
            <Plus className="w-5 h-5" />
            <span>{t("products.addProduct")}</span>
          </button>
        </div>
        {products.length >= 1 ? (
          <>
            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden lg:block bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0b0f10] border-b border-[#1f2a2d]">
                    <tr>
                      <th
                        className={`px-4 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200 w-12`}
                      ></th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200 min-w-[200px]`}
                      >
                        {t("products.table.product")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.category")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.price")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.brand")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.status")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-right" : "text-left"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.numerical")}
                      </th>
                      <th
                        className={`px-6 py-4 ${
                          isRTL ? "text-left" : "text-right"
                        } text-sm font-semibold text-gray-200`}
                      >
                        {t("products.table.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2a2d]">
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        {/* Main Row */}
                        <tr className="hover:bg-white/5 transition-colors duration-150">
                          <td className="px-4 py-4">
                            <button
                              onClick={() => toggleRow(product.id)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {expandedRows[product.id] ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`flex items-center ${
                                isRTL
                                  ? "space-x-reverse space-x-3"
                                  : "space-x-3"
                              }`}
                            >
                              <span className="relative w-12 h-12 shrink-0">
                                <Image
                                  src={product.imageURL}
                                  alt={product.name[i18n.language]}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </span>
                              <div
                                className={
                                  isRTL ? "text-right mr-3" : "text-left"
                                }
                              >
                                <span className="font-medium text-white text-base block">
                                  {product.name[i18n.language]}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`px-6 py-4 text-gray-400 ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {t(`products.categories.${product.category}`)}{" "}
                          </td>
                          <td
                            className={`px-6 py-4 font-medium text-white text-base ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {product.price} {t("products.table.priceunit")}{" "}
                            {product.isNumerical
                              ? t("products.units.item")
                              : t("products.units.kilogram")}
                          </td>
                          <td
                            className={`px-6 py-4 text-gray-400 ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {product.brand[i18n.language]}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                product.isAvailable
                              )}`}
                            >
                              {product.isAvailable
                                ? t("products.table.available")
                                : t("products.table.unavailable")}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                product.isNumerical
                              )}`}
                            >
                              {product.isNumerical
                                ? t("products.table.numerical")
                                : t("products.table.nonNumerical")}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 ${
                              isRTL ? "text-left" : "text-right"
                            }`}
                          >
                            <div
                              className={`flex items-center ${
                                isRTL
                                  ? "justify-start space-x-reverse space-x-2"
                                  : "justify-end space-x-2"
                              }`}
                            >
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 hover:bg-emerald-500/10 text-emerald-300 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all duration-150"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(deleteProduct(product.id))
                                }
                                className="p-2 hover:bg-rose-500/10 text-rose-300 rounded-lg border border-transparent hover:border-rose-500/30 transition-all duration-150"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Description Row */}
                        {expandedRows[product.id] && product.description && (
                          <tr className="bg-white/2">
                            <td></td>
                            <td colSpan="7" className="px-6 py-4">
                              <div
                                className={`flex ${
                                  isRTL
                                    ? "flex-row-reverse space-x-reverse space-x-3"
                                    : "flex-row space-x-3"
                                }`}
                              >
                                <h4 className="text-sm font-semibold text-emerald-400 whitespace-nowrap">
                                  {t("products.description.label")}
                                </h4>
                                <p
                                  className={`text-sm text-gray-300 leading-relaxed ${
                                    isRTL ? "text-right" : "text-left"
                                  }`}
                                >
                                  {product.description[i18n.language]}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablet View - Horizontal scrollable table */}
            <div className="hidden md:block lg:hidden bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#0b0f10] border-b border-[#1f2a2d]">
                    <tr>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200 w-10`}
                      ></th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.product")}
                      </th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.category")}
                      </th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.price")}
                      </th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.brand")}
                      </th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-right" : "text-left"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.status")}
                      </th>
                      <th
                        className={`px-4 py-3 ${
                          isRTL ? "text-left" : "text-right"
                        } text-xs font-semibold text-gray-200`}
                      >
                        {t("products.table.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2a2d]">
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        <tr className="hover:bg-white/5 transition-colors duration-150">
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleRow(product.id)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {expandedRows[product.id] ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div
                              className={`flex items-center ${
                                isRTL
                                  ? "space-x-reverse space-x-2"
                                  : "space-x-2"
                              }`}
                            >
                              <span className="relative w-10 h-10 shrink-0">
                                <Image
                                  src={product.imageURL}
                                  alt={product.name[i18n.language]}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </span>
                              <span className="font-medium text-white text-sm">
                                {product.name[i18n.language]}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`px-4 py-3 text-gray-400 text-sm ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {t(`products.categories.${product.category}`)}{" "}
                          </td>
                          <td
                            className={`px-4 py-3 font-medium text-white text-sm ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {product.price} {t("products.table.priceunit")}
                          </td>
                          <td
                            className={`px-4 py-3 text-gray-400 text-sm ${
                              isRTL ? "text-right" : "text-left"
                            }`}
                          >
                            {product.brand[i18n.language]}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                product.isAvailable
                              )}`}
                            >
                              {product.isAvailable
                                ? t("products.table.available")
                                : t("products.table.unavailable")}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 ${
                              isRTL ? "text-left" : "text-right"
                            }`}
                          >
                            <div
                              className={`flex items-center ${
                                isRTL
                                  ? "justify-start space-x-reverse space-x-1"
                                  : "justify-end space-x-1"
                              }`}
                            >
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-1.5 hover:bg-emerald-500/10 text-emerald-300 rounded-lg border border-transparent hover:border-emerald-500/30 transition-all duration-150"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(deleteProduct(product.id))
                                }
                                className="p-1.5 hover:bg-rose-500/10 text-rose-300 rounded-lg border border-transparent hover:border-rose-500/30 transition-all duration-150"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRows[product.id] && product.description && (
                          <tr className="bg-white/2">
                            <td></td>
                            <td colSpan="6" className="px-4 py-3">
                              <div
                                className={`flex ${
                                  isRTL
                                    ? "flex-row-reverse space-x-reverse space-x-2"
                                    : "flex-row space-x-2"
                                }`}
                              >
                                <h4 className="text-xs font-semibold text-emerald-400 whitespace-nowrap">
                                  {t("products.description.label")}
                                </h4>
                                <p
                                  className={`text-xs text-gray-300 leading-relaxed ${
                                    isRTL ? "text-right" : "text-left"
                                  }`}
                                >
                                  {product.description[i18n.language]}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                >
                  {/* Card Header */}
                  <div
                    className={`flex ${
                      isRTL ? "flex-row-reverse" : "flex-row"
                    } items-start gap-3 p-4 border-b border-[#1f2a2d]`}
                  >
                    <span className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={product.imageURL}
                        alt={product.name[i18n.language]}
                        fill
                        className="object-cover"
                      />
                    </span>
                    <div
                      className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <h3 className="font-semibold text-white text-base mb-1">
                        {product.name[i18n.language]}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {t(`products.categories.${product.category}`)}{" "}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.brand[i18n.language]}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleRow(product.id)}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      {expandedRows[product.id] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div
                      className={`flex ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      } justify-between items-center`}
                    >
                      <span
                        className={`text-sm text-gray-400 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {t("products.table.price")}:
                      </span>
                      <span
                        className={`font-medium text-white ${
                          isRTL ? "text-left" : "text-right"
                        }`}
                      >
                        {product.price} {t("products.table.priceunit")}{" "}
                        {product.isNumerical
                          ? t("products.units.item")
                          : t("products.units.kilogram")}
                      </span>
                    </div>

                    <div
                      className={`flex ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      } justify-between items-center`}
                    >
                      <span
                        className={`text-sm text-gray-400 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {t("products.table.status")}:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.isAvailable
                        )}`}
                      >
                        {product.isAvailable
                          ? t("products.table.available")
                          : t("products.table.unavailable")}
                      </span>
                    </div>

                    <div
                      className={`flex ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      } justify-between items-center`}
                    >
                      <span
                        className={`text-sm text-gray-400 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {t("products.table.numerical")}:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.isNumerical
                        )}`}
                      >
                        {product.isNumerical
                          ? t("products.table.numerical")
                          : t("products.table.nonNumerical")}
                      </span>
                    </div>

                    {/* Expanded Description */}
                    {expandedRows[product.id] && product.description && (
                      <div
                        className={`pt-3 border-t border-[#1f2a2d] ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                          {t("products.description.label")}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {product.description[i18n.language]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer - Actions */}
                  <div
                    className={`flex ${
                      isRTL ? "flex-row-reverse" : "flex-row"
                    } gap-2 p-4 bg-[#0b0f10] border-t border-[#1f2a2d]`}
                  >
                    <button
                      onClick={() => handleEditProduct(product)}
                      className={`flex-1 flex items-center justify-center ${
                        isRTL
                          ? "flex-row-reverse space-x-reverse space-x-2"
                          : "flex-row space-x-2"
                      } py-2 px-4 bg-emerald-500/10 text-emerald-300 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-150`}
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {t("products.table.edit")}
                      </span>
                    </button>
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className={`flex-1 flex items-center justify-center ${
                        isRTL
                          ? "flex-row-reverse space-x-reverse space-x-2"
                          : "flex-row space-x-2"
                      } py-2 px-4 bg-rose-500/10 text-rose-300 rounded-lg border border-rose-500/30 hover:bg-rose-500/20 transition-all duration-150`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {t("products.table.delete")}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] p-8 text-center">
            <p className="text-gray-400 text-base">No products yet</p>
          </div>
        )}
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
};

export default Products;
