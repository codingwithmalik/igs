"use client";
import React from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { FaHome } from "react-icons/fa";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import LangBtn from "./LangBtn";
import { FaPhoneAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import i18next from "i18next";

const Header = () => {
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && menuRef.current) {
        // Check if click is outside both navbar and menu button
        if (
          !navRef.current.contains(event.target) &&
          !menuRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
    };

    // Add event listener when navbar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useGSAP(() => {
    const tl = gsap.timeline();
    const navElement = navRef.current;
    if (navElement) {
      const navWidth = navElement.offsetWidth;
      if (document.body.dir === "ltr") {
        tl.to(".nav", {
          x: isOpen ? -16 : -navWidth,
          autoAlpha: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          duration: 0.4,
          ease: "expo.inOut",
        });
      } else {
        tl.to(".nav", {
          x: isOpen ? -navWidth + 54 : 0,
          autoAlpha: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          duration: 0.4,
          ease: "expo.inOut",
        });
      }
      tl.to(".link", {
        x: isOpen ? 0 : -20,
        opacity: isOpen ? 1 : 0,
        stagger: 0.1,
      });
    }
  }, [isOpen]);
  return (
    <div>
      <div className="header gradient px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center shadow-4xl">
        <div className="leftside flex items-center gap-2 sm:gap-4">
          <div className="relative flex justify-center items-center">
            <button
              ref={menuRef}
              className="menu text-2xl sm:text-3xl md:text-4xl"
              type="button"
              onClick={toggleNavbar}
            >
              <IoMenu />
            </button>
            <nav
              ref={navRef}
              className={`nav gradient text-gray-50 capitalize flex absolute top-[2.35rem] sm:top-[3.35rem] left-0 p-6 sm:p-8 md:p-10 w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[30vw] items-center flex-col gap-8 sm:gap-10 h-[calc(100vh-2.5rem)] sm:h-[90vh] opacity-0 z-50 rounded-2xl`}
            >
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="link nav-link opacity-0 text-xl sm:text-2xl"
              >
                <FaHome />
                <span>{t("homelink")}</span>
              </Link>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="link nav-link opacity-0 text-xl sm:text-2xl"
              >
                <AiFillProduct />
                <span>{t("productlink")}</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="link nav-link opacity-0 text-xl sm:text-2xl"
              >
                <FaUser />
                <span>{t("aboutlink")}</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="link nav-link opacity-0 text-xl sm:text-2xl"
              >
                <FaPhoneAlt />
                <span>{t("contactlink")}</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="link nav-link opacity-0 text-xl sm:text-2xl"
              >
                <FaListAlt />
                <span>{t("orderlink")}</span>
              </Link>
            </nav>
          </div>
          <div className="logo">
            <h1>
              <Link
                to="/"
                className="PM text-2xl sm:text-3xl md:text-4xl lg:text-5xl flex justify-center items-center space-x-1 sm:space-x-2"
              >
                <img
                  src="../logo.png"
                  alt="Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <span>IGS</span>
              </Link>
            </h1>
          </div>
        </div>
        <div className="cart flex justify-center items-center gap-x-2 sm:gap-x-3 text-xl sm:text-2xl md:text-3xl">
          <HiShoppingCart />
          <LangBtn />
        </div>
      </div>
    </div>
  );
};

export default Header;
