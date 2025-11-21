"use client";
import i18next from "i18next";
import React from "react";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";

const LangBtn = () => {
  const togglelanguage = () => {
    const language = i18next.language === "en" ? "ur" : "en";
    i18next.changeLanguage(language);
  };
  useEffect(() => {
    document.body.dir = i18next.dir();
  }, [i18next, i18next.language]);
  const [show, setShow] = useState(false);
  const toggleshow = () => {
    setTimeout(() => {
      setShow((prev)=> !prev)
    }, 2000);
  };
  const triggeranimtion = () => {
    setShow((prev) => !prev);
    if (document.body.dir === "ltr") {
      gsap.to(".animation", {
        x: "100vw",
        duration: 2,
        ease:"sine"
      });
    } else {
      gsap.to(".animation", {
        x: "-100vw",
        duration: 2,
        ease: "sine",
      });
    }
  };

  return (
    <>
      <div
        className={`animation w-screen h-screen ${
          show ? "flex" : "hidden"
        } absolute top-0 left-0 bg-black z-1000`}
      ></div>
      <div className="">
        <button
          className="glass-bg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base md:text-xl border-2 font-bold text-white rounded-lg"
          onClick={() => {
            togglelanguage();
            triggeranimtion();
            toggleshow();
          }}
        >
          {i18next.language === "en" ? "اردو" : "English"}
        </button>
      </div>
    </>
  );
};

export default LangBtn;
