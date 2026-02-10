"use client";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import all your translation files
import homeEN from "@/public/locales/en/home.json";
import homeUR from "@/public/locales/ur/home.json";
import headerEN from "@/public/locales/en/header.json";
import headerUR from "@/public/locales/ur/header.json";
import footerEN from "@/public/locales/en/footer.json";
import footerUR from "@/public/locales/ur/footer.json";
import productsSearcherEN from "@/public/locales/en/products/searcher.json";
import productsSearcherUR from "@/public/locales/ur/products/searcher.json";
import productsProductsEN from "@/public/locales/en/products/products.json";
import productsProductsUR from "@/public/locales/ur/products/products.json";
import cartEN from "@/public/locales/en/cart.json";
import cartUR from "@/public/locales/ur/cart.json";
import adminLoginEN from "@/public/locales/en/admin/login.json";
import adminLoginUR from "@/public/locales/ur/admin/login.json";
import adminHomeEN from "@/public/locales/en/admin/home.json";
import adminHomeUR from "@/public/locales/ur/admin/home.json";

// Bundle all translations
const resources = {
  en: {
    home: homeEN,
    header: headerEN,
    footer: footerEN,
    "products/searcher": productsSearcherEN,
    "products/products": productsProductsEN,
    cart: cartEN,
    "admin/login": adminLoginEN,
    "admin/home": adminHomeEN,
  },
  ur: {
    home: homeUR,
    header: headerUR,
    footer: footerUR,
    "products/searcher": productsSearcherUR,
    "products/products": productsProductsUR,
    cart: cartUR,
    "admin/login": adminLoginUR,
    "admin/home": adminHomeUR,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // Use bundled resources instead of HTTP backend
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "ur"],
    returnObjects: true,
    ns: [
      "home",
      "header",
      "footer",
      "products/searcher",
      "products/products",
      "cart",
      "admin/login",
      "admin/home",
    ],
    defaultNS: "home",
  });

export default i18next;
