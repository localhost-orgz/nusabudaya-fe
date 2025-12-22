"use client";

import { CircleHelp, Laptop, TabletSmartphone, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { DESKTOP_GUIDES, MOBILE_GUIDES } from "@/constants/listGuideAtlas";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Guide = ({ onClose }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const GuideRef = useRef(null);

  // ✨ ANIMASI GSAP MAGIC DISINI
  useGSAP(() => {
    gsap.from(GuideRef.current, {
      scale: 0.8, // Mulai dari ukuran 80% (jangan 0 biar ga terlalu drastis)
      opacity: 0, // Mulai dari transparan
      duration: 0.5, // Durasi setengah detik
      ease: "back.out(1.7)", // Efek membal sedikit (bouncy) biar playful
    });
  });

  const currentGuides = isDesktop ? DESKTOP_GUIDES : MOBILE_GUIDES;

  return (
    <div
      ref={GuideRef}
      // Tambahin 'origin-center' biar scaling-nya pas dari tengah
      className="w-[90%] md:w-md bg-linear-to-br from-[#0D1922] to-[#0b131a]/95 backdrop-blur-xl border border-(--color-secondary) shadow-[0_0_50px_-12px_rgba(138,7,254,0.3)] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10000 rounded-2xl p-6 origin-center"
    >
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-(--color-secondary)/10 border border-(--color-secondary)/30">
            <CircleHelp className="stroke-(--color-secondary) w-5 h-5" />
          </div>
          <span className="text-lg md:text-xl text-white font-semibold tracking-wide">
            Petunjuk Penggunaan
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-red-500/10 border border-transparent hover:border-red-500/50 transition-all duration-100 cursor-pointer"
        >
          <X className="stroke-red-500/50 w-5 h-5" />
        </button>
      </div>

      <div className="w-full h-px bg-linear-to-r from-transparent via-(--color-secondary)/50 to-transparent mb-5"></div>

      {/* --- TOGGLE DEVICE --- */}
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-gray-400 text-xs uppercase tracking-wider font-medium ml-1">
          Pilih Device
        </span>
        <div className="w-full p-1 bg-[#050a0e] border border-white/10 rounded-full flex relative">
          <button
            onClick={() => setIsDesktop(true)}
            className={`flex items-center gap-2 w-full justify-center py-2 rounded-full transition-all duration-300 cursor-pointer ${
              isDesktop
                ? "bg-(--color-secondary) text-white shadow-lg shadow-(--color-secondary)/20"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span className="text-sm font-medium">Desktop</span>
          </button>

          <button
            onClick={() => setIsDesktop(false)}
            className={`flex items-center gap-2 w-full justify-center py-2 rounded-full transition-all duration-300 cursor-pointer ${
              !isDesktop
                ? "bg-(--color-secondary) text-white shadow-lg shadow-(--color-secondary)/20"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <TabletSmartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Mobile</span>
          </button>
        </div>
      </div>

      {/* --- LIST CONTENT --- */}
      <div className="flex flex-col gap-4 min-h-[180px]">
        {currentGuides.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-(--color-secondary)/50 hover:bg-white/10 transition-colors group"
          >
            <div className="mt-0.5 p-1.5 rounded-lg bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-medium">
                {item.text.split(" ")[0]} {item.text.split(" ")[1]}
              </span>{" "}
              {item.text.split(" ").slice(2).join(" ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
