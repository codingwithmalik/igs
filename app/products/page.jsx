"use client";
import React, { useState } from "react";
import Searcher from "@/components/Products/Searcher";
import Product from "@/components/Products/Product";
import products from "@/app/store/slices/productsSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation("products/products");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
    // filter products here
  };

  const handleCategoryClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    // filter products by category here
  };

  const categoriesObj = t("categories", { returnObjects: true });
  const categories = Object.keys(categoriesObj);

  // Filter products based on active category
  const filteredProducts =
    products && Array.isArray(products)
      ? products
          // 1️⃣ Filter by category if active
          .filter((product) =>
            activeCategory && activeCategory !== "all"
              ? product.category === activeCategory
              : true
          )
          // 2️⃣ Filter by search term if any
          .filter((product) => {
            if (!searchTerm || searchTerm === "") return true;
            const term = searchTerm.toLowerCase();
            return (
              product.name.en.toLowerCase().includes(term) ||
              product.name.ur.toLowerCase().includes(term) ||
              product.brand.en.toLowerCase().includes(term) ||
              product.brand.ur.toLowerCase().includes(term)
            );
          })
      : [];
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-[#171d1e] to-[#1a2324]">
        <div className="h-auto">
          <div className="sticky top-0 z-10">
          <div className="searcher"
          style={{ top: 0, zIndex: 10,  position: "sticky" }}>
            <Searcher
              onCategoryClick={handleCategoryClick}
              onSearch={handleSearch}
              filteredProducts={filteredProducts}
            />
          </div>
          <div
            className={`categories-container bg-linear-to-b from-[#171d1e] to-[#1a2324] border-b border-[#468759]/20 overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-[1000px] opacity-100 py-6 px-4"
                : "max-h-0 opacity-0 py-0 px-4"
            }`}
          >
            <div className="max-w-8xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleCategorySelect(category);
                      handleCategoryClick();
                    }}
                    className={`category-button group relative px-4 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 shadow-md overflow-hidden ${
                      activeCategory === category
                        ? "bg-[#2ecb5d] text-[#171d1e] hover:bg-[#0dd045] shadow-lg shadow-[#2ecb5d]/30 scale-105"
                        : "bg-[#2a3334] text-gray-200 hover:bg-[#3a4546] hover:text-white border border-[#468759]/20 hover:border-[#468759]/50 hover:shadow-lg hover:shadow-[#468759]/20"
                    }`}
                  >
                    <span className="relative z-10">
                      {t(`categories.${category}`)}
                    </span>
                    {activeCategory === category && (
                      <div className="absolute inset-0 bg-linear-to-br from-[#2ecb5d] to-[#0dd045] opacity-90"></div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-br from-[#468759]/0 to-[#468759]/0 group-hover:from-[#468759]/10 group-hover:to-[#468759]/5 transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>
          {/* Products Grid - responsive columns with flexible min width */}
          <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
                {filteredProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center sm:py-16 md:py-20">
                <p className="text-lg text-gray-400 sm:text-xl md:text-2xl">
                  {t("noProducts") || "No products found"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
