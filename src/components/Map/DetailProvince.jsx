import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { X } from "lucide-react"; // Optional: Buat tombol close kalau mau
import CardBudaya from "./CardBudaya";

const DetailProvince = ({ province, onClose }) => {
  const openClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const closedClipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
  useGSAP(() => {
    gsap.fromTo(
      ".panel",
      { clipPath: closedClipPath },
      {
        clipPath: openClipPath,
        duration: 1.2,
        ease: "power3.inOut",
      }
    );
  }, [province]); // Trigger ulang animasi kalau province berubah

  const handleCloseClick = () => {
    gsap.to(".panel", {
      clipPath: closedClipPath,
      duration: 0.8, // Durasi tutup lebih cepet dikit biar snappy
      ease: "power3.inOut",
      onComplete: () => {
        // 🔥 PENTING: Panggil onClose dari parent SETELAH animasi selesai
        onClose();
      },
    });
  };

  if (!province) return null;

  return (
    <div className="panel w-[400px] h-screen fixed z-9999 top-0 left-64 bg-[#0D1922] backdrop-blur-md shadow-2xl border-r border-gray-200 overflow-y-auto py-8 px-5 text-slate-800">
      {/* ✨ TOMBOL CLOSE (X) */}
      <button
        onClick={handleCloseClick}
        className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors duration-200 group"
      >
        <X size={20} className="text-gray-600 group-hover:text-red-600" />
      </button>

      {/* --- HEADER --- */}
      <div>
        <p className="text-left text-white">Detail budaya</p>
        <h2 className="text-3xl font-bold text-(--color-secondary) mb-1">
          {province.namaProvinsi}
        </h2>
      </div>

      <div className="border border-(--color-secondary) opacity-30 my-5"></div>

      {/* --- INFO UTAMA --- */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between">
          <span className="font-medium text-white">Ibu Kota:</span>
          <span className="text-white">{province.ibuKotaProvinsi}</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="font-medium">Luas Wilayah:</span>
          <span>{province.luas}</span>
        </div>
        <div className="flex justify-between text-white">
          <span className="font-medium">Populasi:</span>
          <span>{province.population} Jiwa</span>
        </div>
      </div>

      <div className="flex gap-1 items-center mb-8">
        <div className="border-2 h-5 border-(--color-secondary)"></div>
        <h5 className="text-xl font-bold text-white ">Budaya</h5>
      </div>

      {/* List budaya */}
      <div className="flex flex-col gap-4">
        <CardBudaya name={province.rumahAdat} />
        <CardBudaya name={province.tarianTradisional} />
      </div>
    </div>
  );
};

export default DetailProvince;
