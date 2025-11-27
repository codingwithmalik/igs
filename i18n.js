"use client";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";
// import Cache from "i18next-localstorage-cache"
i18next
  .use(I18NextHttpBackend)
  // .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    supportedLngs: ["en", "ur"],
    returnObjects: true,
    backend: {
      loadPath: (lng, ns) => {
        return `/locales/${lng}/${ns}.json`;
      },
    },
    ns: [
      "home",
      "header",
      "footer",
      "products/searcher",
      "products/products",
      "admin/login",
    ], // all pages
    defaultNS: "home",
  });

export default i18next;
