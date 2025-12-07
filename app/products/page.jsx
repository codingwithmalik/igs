"use client";
import React, { useState, useRef, useEffect} from "react";
import Searcher from "@/components/Products/Searcher";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const Products = () => {
  const { t } = useTranslation("products/products");
  const CategoriesRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value) => {
    console.log("Searching:", value);
    // filter products here
  };
  useEffect(() => {
    if (CategoriesRef.current) {
      gsap.set(CategoriesRef.current, { height: 0, opacity: 0, overflow: "hidden" });
    }
  }, []);
  
  const handleCategoryClick = () => {
    const NewIsOpen = !isOpen;
    setIsOpen(NewIsOpen);
    
    if (!CategoriesRef.current) return;
    
    if (NewIsOpen) {
      // Get the natural height of the content
      gsap.set(CategoriesRef.current, { height: "auto" });
      const height = CategoriesRef.current.offsetHeight;
      gsap.set(CategoriesRef.current, { height: 0 });
      
      // Set initial state for buttons before animating
      // const buttons = CategoriesRef.current.querySelectorAll("button");
      gsap.set(".category-button", { opacity: 0, y: -20, scale: 0.9 });
      
      // Animate opening with smooth easing
      gsap.to(CategoriesRef.current, {
        height: height,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(CategoriesRef.current, { height: "auto" });
        }
      });
      
      // Stagger animation for category buttons with bounce effect
      gsap.to(".category-button", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.4)",
        delay: 0.15,
      });
    } else {
      // Get current height before closing
      const height = CategoriesRef.current.offsetHeight;
      gsap.set(CategoriesRef.current, { height: height });
      
      // Fade out buttons first
      const buttons = CategoriesRef.current.querySelectorAll("button");
      gsap.to(buttons, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
      });
      
      // Then animate closing container
      gsap.to(CategoriesRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        delay: 0.1,
      });
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    console.log("Selected category:", category);
    // filter products by category here
  };

  const categoriesObj = t("categories", { returnObjects: true });
  const categories = Object.keys(categoriesObj);

  return (
    <>
      <div>
        <div className="h-screen">
          <div className="searcher">
            <Searcher
              onCategoryClick={handleCategoryClick}
              onSearch={handleSearch}
            />
          </div>
          <div
            ref={CategoriesRef}
            className="categories-container bg-linear-to-b from-[#171d1e] to-[#1a2324] py-6 px-4 border-b border-[#468759]/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategorySelect(category)}
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
      </div>
    </>
  );
};

export default Products;
