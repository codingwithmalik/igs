"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { LayoutGrid, Search } from "lucide-react";

const Searcher = ({ onCategoryClick, onSearch }) => {
  const { t } = useTranslation("products/searcher");

  return (
    <>
      <div className="">
        <div className="flex w-full items-center gap-3 border-b border-b-[#468759]/30 p-3 shadow-sm gradient ">
          {/* Categories Button */}
          <button
            onClick={onCategoryClick}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#2ecb5d] px-4 py-2 font-medium text-[#171d1e] shadow-md transition hover:bg-[#0dd045] hover:shadow-lg"
          >
            <LayoutGrid className="h-5 w-5 shrink-0" aria-hidden />
            {t("categories")}
          </button>

          {/* Search Input */}
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#468759]/20 bg-[#171d1e]/80 px-3 py-2 sm:px-4">
            <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full min-w-0 bg-transparent text-gray-50 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searcher;
