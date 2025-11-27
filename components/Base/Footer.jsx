"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaUser, FaListAlt } from "react-icons/fa";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation(["footer", "header"]);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(".footer-item", {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".footer-item", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="footer w-full bg-[#171d1e] border-t border-[#468759]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
          {/* Company Info */}
          <div className="footer-item">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <img
                src="../logo.png"
                alt="IGS Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="PM text-2xl sm:text-3xl text-white">IGS</span>
            </Link>
            <p className="text-gray-300 text-md sm:text-base leading-relaxed mb-4">
              {t("footerCompanyDesc")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              {t("footerQuickLinks")}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#10e850] transition-colors duration-300 text-sm sm:text-base group"
                >
                  <FaHome className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("header:homelink")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#10e850] transition-colors duration-300 text-sm sm:text-base group"
                >
                  <AiFillProduct className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("header:productlink")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#10e850] transition-colors duration-300 text-sm sm:text-base group"
                >
                  <FaUser className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("header:aboutlink")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#10e850] transition-colors duration-300 text-sm sm:text-base group"
                >
                  <FaPhoneAlt className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("header:contactlink")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#10e850] transition-colors duration-300 text-sm sm:text-base group"
                >
                  <FaListAlt className="text-sm group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("header:orderlink")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-item">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              {t("footerContact")}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <FaPhoneAlt className="text-[#10e850] mt-1 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{t("footerPhone")}: </span>
                  <a
                    href="tel:+1234567890"
                    className="hover:text-[#10e850] transition-colors duration-300"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <FaEnvelope className="text-[#10e850] mt-1 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{t("footerEmail")}: </span>
                  <a
                    href="mailto:info@igs.com"
                    className="hover:text-[#10e850] transition-colors duration-300 break-all"
                  >
                    info@igs.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-[#10e850] mt-1 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{t("footerAddress")}: </span>
                  <span>123 Grocery Street, City, Country</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-[#468759]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
              {t("footerCopyright")}
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{t("footerMadeWith")}</span>
              <span className="text-[#10e850]">❤️</span>
              <span>{t("footerFor")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;