"use client";
import { useState } from "react";
import { X } from "lucide-react";

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(
    product
      ? {
          ...product,
          tags: product.tags ? product.tags.join(", ") : "",
        }
      : {
          id: "",
          name: "",
          price: 0,
          description: "",
          category: "",
          brand: "Generic",
          isAvailable: true,
          imageURL: "",
          tags: "",
        }
  );

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    onSave(formattedData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur p-4">
      <div className="bg-[#0f1415] border border-[#1f2a2d] rounded-xl p-4 sm:p-6 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.55)] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
            </select>
          </div>

          {/* BRAND */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Brand
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="example: gaming, rgb, wireless"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={formData.imageURL}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageURL: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter image URL"
            />
          </div>

          {/* IS AVAILABLE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-gray-300 text-sm">Available</label>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#1f2a2d] text-gray-200 rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow"
            >
              {product ? "Update" : "Add"} Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
