import React from "react";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";

const Products = ({
  products,
  setEditingProduct,
  setShowProductModal,
  getStatusColor,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  return (
    <div>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Products
          </h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            className="flex items-center justify-center space-x-2 bg-linear-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        <div className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-[#0b0f10] border-b border-[#1f2a2d]">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Product
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200">
                    Price
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-200 hidden sm:table-cell">
                    Brand
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
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                          <Image
                            src={product.imageURL}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </span>
                        <div>
                          <span className="font-medium text-white text-sm sm:text-base block">
                            {product.name}
                          </span>
                          <span className="text-xs text-gray-400 md:hidden">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden md:table-cell">
                      {product.category}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-white text-sm sm:text-base">
                      ${product.price}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-400 hidden sm:table-cell">
                      {product.brand}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.isAvailable
                        )}`}
                      >
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-1.5 sm:p-2 hover:bg-emerald-500/10 text-emerald-300 rounded-lg border border-transparent hover:border-emerald-500/30"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 hover:bg-white/5 text-gray-300 rounded-lg border border-transparent hover:border-[#1f2a2d]">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 sm:p-2 hover:bg-rose-500/10 text-rose-300 rounded-lg border border-transparent hover:border-rose-500/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default Products;
