"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDollarSign, FaShippingFast, FaCheckCircle } from "react-icons/fa";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation("home");
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const servicesRef = useRef(null);

  useGSAP(
    
    () => {
      if (typeof window === "undefined") return; // skip server-side rendering
      if (!heroRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        );
    },
    { scope: heroRef }
  );

  // Services section staggered animations with ScrollTrigger
  useGSAP(
    () => {
      if (typeof window === "undefined") return; // skip server
      if (!servicesRef.current) return;
      // Set initial states for service cards
      gsap.set(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      gsap.set(".service-icon", {
        scale: 0,
        rotation: -180,
      });

      // Create timeline for service cards animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Animate service cards with stagger
      tl.to(".service-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
      })
        // Then animate icons with stagger
        .to(
          ".service-icon",
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
    },
    { scope: servicesRef }
  );

  return (
    <>
      <div ref={heroRef} className="relative w-full">
        {/* Hero Section */}
        <div className="heroSection relative flex items-center justify-center min-h-[90vh] h-[90vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/items.jpg"
              alt="Fresh Groceries Background"
              fill
              priority
              className="object-cover"
              quality={90}
              sizes="100vw"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/80 to-black/80 z-10"></div>
            {/* Additional green accent overlay matching theme */}
            <div className="absolute inset-0 bg-linear-to-r from-[#468759]/15 via-transparent to-transparent z-10"></div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            {/* Main Title */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl">
              <span className="inline-block bg-linear-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                {t("heroTitle")}
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="hero-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 text-[#10e850] drop-shadow-lg">
              {t("heroSubtitle")}
            </h2>

            {/* Description */}
            <p className="hero-description text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto text-gray-100 leading-relaxed drop-shadow-md">
              {t("heroDescription")}
            </p>

            {/* Call to Action Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/products"
                className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-[#468759] hover:bg-[#3a6f48] text-white font-semibold text-base sm:text-lg md:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#468759]/50 flex items-center justify-center gap-2 min-w-40 sm:min-w-[180px]"
              >
                <span>{t("shopNow")}</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/products"
                className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white/80 hover:border-white text-white font-semibold text-base sm:text-lg md:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center gap-2 min-w-[160px] sm:min-w-[180px]"
              >
                <span>{t("viewProducts")}</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <svg
              className="w-6 h-6 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div
        ref={servicesRef}
        className="services w-full py-16 sm:py-20 md:py-24 bg-[#171d1e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-white">
            {t("servicesTitle")}
          </h2>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Service 1 - Affordable Prices */}
            <div
              id="card-1"
              className="service-card group relative bg-linear-to-br from-[#468759]/20 to-[#468759]/5 backdrop-blur-sm border border-[#468759]/30 rounded-2xl p-6 sm:p-8 hover:border-[#468759]/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#468759]/20"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="service-icon mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#468759] flex items-center justify-center text-white text-3xl sm:text-4xl group-hover:bg-[#10e850] transition-colors duration-300 shadow-lg shadow-[#468759]/50">
                  <FaDollarSign />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#10e850] transition-colors duration-300">
                  {t("service1Title")}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {t("service1Description")}
                </p>
              </div>
            </div>

            {/* Service 2 - Fast Delivery */}
            <div className="service-card group relative bg-linear-to-br from-[#468759]/20 to-[#468759]/5 backdrop-blur-sm border border-[#468759]/30 rounded-2xl p-6 sm:p-8 hover:border-[#468759]/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#468759]/20">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="service-icon mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#468759] flex items-center justify-center text-white text-3xl sm:text-4xl group-hover:bg-[#10e850] transition-colors duration-300 shadow-lg shadow-[#468759]/50">
                  <FaShippingFast />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#10e850] transition-colors duration-300">
                  {t("service2Title")}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {t("service2Description")}
                </p>
              </div>
            </div>

            {/* Service 3 - Fresh Quality Products */}
            <div className="service-card group relative bg-linear-to-br from-[#468759]/20 to-[#468759]/5 backdrop-blur-sm border border-[#468759]/30 rounded-2xl p-6 sm:p-8 hover:border-[#468759]/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#468759]/20">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="service-icon mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#468759] flex items-center justify-center text-white text-3xl sm:text-4xl group-hover:bg-[#10e850] transition-colors duration-300 shadow-lg shadow-[#468759]/50">
                  <FaCheckCircle />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#10e850] transition-colors duration-300">
                  {t("service3Title")}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {t("service3Description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
