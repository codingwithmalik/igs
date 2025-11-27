"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Searcher = ({onCategoryClick , onSearch}) => {
  const { t } = useTranslation("products/searcher");
  return (
    <>
      <div className="">
        <div className="w-full flex items-center gap-3 gradient p-3  shadow-sm border-b border-b-[#468759]/30">
          {/* Categories Button */}
          <button
            onClick={onCategoryClick}
            className="px-4 py-2 bg-[#2ecb5d] text-[#171d1e] rounded-xl hover:bg-[#0dd045] transition font-medium whitespace-nowrap shadow-md hover:shadow-lg"
          >
            {t("categories")}
          </button>

          {/* Search Input */}
          <div className="flex-1 flex items-center bg-[#171d1e]/80 rounded-xl px-4 py-2 border border-[#468759]/20">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-50 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searcher;
