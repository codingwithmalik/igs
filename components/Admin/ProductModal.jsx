"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function ProductModal({ product, onClose, onSave }) {
  const { t } = useTranslation("admin/home");
  const categoriesDict = {
    electronics: { en: "Electronics", ur: "الیکٹرانکس" },
    grains: { en: "Grains", ur: "اناج" },
    fashion: { en: "Fashion", ur: "فیشن" },
    homeappliances: { en: "Home Appliances", ur: "گھر کے برقی آلات" },
    books: { en: "Books", ur: "کتابیں" },
    toys: { en: "Toys", ur: "کھلونے" },
  };
  const [formData, setFormData] = useState(
    product
      ? {
          ...product,
          category: Object.keys(categoriesDict).find(
            (key) =>
              categoriesDict[key].en === product.category.en &&
              categoriesDict[key].ur === product.category.ur
          ),
        }
      : {
          id: "",
          name: { en: "", ur: "" },
          description: { en: "", ur: "" },
          price: 0,
          category: "Electronics",
          brand: { en: "Generic", ur: "جنرل" },
          isNumerical: true,
          isAvailable: true,
          imageURL: "",
        }
  );

  const handleSubmit = () => {
    const categoryKey = formData.category;

    const finalData = {
      ...formData,
      category: categoriesDict[categoryKey], // replaces key with EN + UR
    };
    console.log("Submitting Product Data:", finalData);
    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-101 backdrop-blur p-4">
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
          {/* NAME EN */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.nameen")}
            </label>
            <input
              type="text"
              value={formData.name.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: { ...formData.name, en: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* NAME URDU */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.nameur")}
            </label>
            <input
              type="text"
              value={formData.name.ur}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: { ...formData.name, ur: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* DESCRIPTION EN */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.descriptionen")}
            </label>
            <textarea
              value={formData.description.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, en: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* DESCRIPTION URDU */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.descriptionur")}
            </label>
            <textarea
              value={formData.description.ur}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, ur: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.price")}
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
              {t("productmodal.category")}
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="electronics">
                {t("productmodal.categories.electronics")}
              </option>
              <option value="grains">
                {t("productmodal.categories.grains")}
              </option>
              <option value="fashion">
                {t("productmodal.categories.fashion")}
              </option>
              <option value="homeappliances">
                {t("productmodal.categories.homeappliances")}
              </option>
              <option value="books">
                {t("productmodal.categories.books")}
              </option>
              <option value="toys">{t("productmodal.categories.toys")}</option>
            </select>
          </div>

          {/* BRAND EN */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.brand")} (English)
            </label>
            <input
              type="text"
              value={formData.brand.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: { ...formData.brand, en: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          {/* BRAND UR */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.brand")} (Urdu)
            </label>
            <input
              type="text"
              value={formData.brand.ur}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: { ...formData.brand, ur: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-[#1f2a2d] bg-[#0b0f10] text-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("productmodal.imageURL")}
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
            <label className="text-gray-300 text-sm">
              {t("productmodal.isavailable")}
            </label>
          </div>

          {/* IS NUMERICAL */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isNumerical}
              onChange={(e) =>
                setFormData({ ...formData, isNumerical: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-gray-300 text-sm">
              {t("productmodal.isnumerical")}
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#1f2a2d] text-gray-200 rounded-lg hover:bg-white/5"
            >
              {t("productmodal.cancelbutton")}
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-shadow"
            >
              {product
                ? t("productmodal.updatebutton")
                : t("productmodal.addbutton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
