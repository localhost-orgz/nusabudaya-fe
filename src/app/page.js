"use client";

import FeatureHeader from "@/components/Landing/FeatureHeader";
import FeatureRow from "@/components/Landing/FeatureRow";
import LandingNavbar from "@/components/Landing/LandingNavbar";
import FAQSection from "@/components/Landing/FAQSection";
import { LIST_FEATURES } from "@/constants/listFeatures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 👈 1. Import ScrollTrigger
import { ArrowRight, MoveDown } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { SplitText } from "gsap/all";
import { IMAGES } from "@/constants/listHeroImages";
IMAGES;

gsap.registerPlugin(SplitText, ScrollTrigger);

function Page() {
  const mainRef = useRef(null); // Ref buat scope satu halaman penuh
  const navbarRef = useRef(null);

  useGSAP(
    () => {
      // --- 1. HERO IMAGE SLIDER & LOAD ---
      // (Kode lama kamu, aku simpen karena udah oke)
      const imgs = document.querySelectorAll(".hero-img");
      const totalImages = imgs.length;

      gsap.set(imgs, { opacity: 0, filter: "blur(10px)" });
      gsap.set(imgs[0], { opacity: 1, filter: "blur(0px)" });

      const timeline = gsap.timeline({ repeat: -1 });

      imgs.forEach((img, index) => {
        const nextIndex = (index + 1) % totalImages;
        const nextImg = imgs[nextIndex];
        timeline
          .to(
            img,
            { filter: "blur(10px)", duration: 1.5, ease: "power2.inOut" },
            "+=2"
          )
          .to(nextImg, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "<")
          .to(
            nextImg,
            { filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "-=1"
          )
          .set(img, { opacity: 0 });
      });

      // --- 2. HERO TEXT REVEAL (Load Awal) ---
      const tl = gsap.timeline();
      const headlineSplitted = SplitText.create(".headline", { type: "lines" });
      const subHeadlineSplitted = SplitText.create(".subheadline", {
        type: "lines",
      });

      tl.from(headlineSplitted.lines, {
        y: 100, // Pake angka aja biar performa lebih bagus
        opacity: 0,
        duration: 1.5,
        ease: "power4.out", // Sedikit lebih smooth dari expo
        rotation: 0.01,
        force3D: true, // Maksa pake hardware acceleration
        stagger: 0.1,
      }).from(
        subHeadlineSplitted.lines,
        {
          y: 50,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.1,
          rotation: 0.01,
          force3D: true, // Maksa pake hardware acceleration
        },
        "-=1.2"
      );

      // --- 3. SCROLL TRIGGER: FEATURE ROWS ---
      // Kita ambil semua elemen dengan class .feature-item
      const features = gsap.utils.toArray(".feature-item");

      features.forEach((feature) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: "top 80%", // Mulai animasi pas elemen masuk 85% viewport (agak bawah)
            toggleActions: "play none none reverse", // Play pas masuk, reverse pas scroll ke atas (opsional)
          },
          y: -80, // Slide dari bawah ke atas
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // --- 4. SCROLL TRIGGER: FAQ SECTION ---
      gsap.from(".faq-container", {
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 80%",
        },
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: mainRef }
  ); // Scope ke wrapper utama biar aman

  return (
    // Tambahin ref di div terluar
    <div ref={mainRef} className="w-full bg-(--color-primary)">
      <LandingNavbar ref={navbarRef} />

      <section
        className="w-full relative overflow-hidden h-dvh bg-black"
        id="home"
      >
        {IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero background ${index + 1}`}
            className="hero-img inset-0 absolute w-full h-full object-cover"
          />
        ))}

        <div className="w-full h-full inset-0 absolute z-2 bg-black/20"></div>
        <div className="w-full h-full inset-0 absolute z-2 bg-linear-to-t from-(--color-primary) via-(--color-primary)/60 to-transparent flex items-center justify-center px-4">
          <div className="flex flex-col items-center w-full max-w-4xl text-center mb-10 md:mb-0">
            {/* Class headline dipake di GSAP */}
            <h1 className="headline text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight md:leading-17">
              Jelajahi Kekayaan Nusantara dengan Cara Baru
            </h1>
            {/* Class subheadline dipake di GSAP */}
            <p className="subheadline text-white font-light w-full max-w-lg md:max-w-2xl mt-4 text-sm md:text-lg leading-relaxed md:leading-6.5 px-2">
              Padukan kecanggihan AI, peta interaktif, dan serunya games untuk
              mendalami warisan leluhur. Dari Sabang sampai Merauke, semua ada
              di sini!
            </p>

            {/* Button juga bisa kita kasih animasi dikit biar ga kaget munculnya */}
            <div className="headline mt-6 md:mt-8">
              <Link
                href={"/login"}
                className="group bg-(--color-primary) cta border flex items-center text-white py-3 px-7 md:py-3.5 md:px-8 gap-3 shadow-2xl border-(--color-secondary)/80 rounded-full font-medium text-sm md:text-base hover:bg-opacity-90 transition-all"
              >
                <StaggerText title="Mulai Eksplorasi" />
                <ArrowRight
                  strokeWidth={2.5}
                  className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="p-2 md:p-3 rounded-full text-white absolute border border-white left-1/2 -translate-x-1/2 bottom-20 md:bottom-30 z-10 animate-bounce">
          <MoveDown className="w-4 h-4" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="fitur"
        className="w-full bg-(--color-primary) py-12 md:py-20 relative z-10"
      >
        <div className="px-4">
          <FeatureHeader />
        </div>
        <div className="w-full max-w-6xl mx-auto mt-12 md:mt-35 px-4 md:px-8 flex flex-col gap-20 md:gap-30">
          {LIST_FEATURES.map((feature, index) => (
            <div key={index} className="feature-item">
              <FeatureRow
                title={feature.featureName}
                description={feature.featureDesc}
                video={feature.featureVid}
                change={index % 2 === 0}
                count={index}
                src={feature.featureVid}
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      {/* 👈 Wrapper div buat target animasi FAQ */}
      <div className="faq-container">
        <FAQSection />
      </div>

      <footer className="w-full bg-[#030b11] py-8 text-center text-white/30 text-sm">
        <p>
          &copy; {new Date().getFullYear()} NusaBudaya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Komponen StaggerText tetep sama
const StaggerText = ({ title, className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      <span className="flex whitespace-pre text-center">
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex justify-center items-center whitespace-pre text-center">
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

export default Page;
