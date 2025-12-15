// src/components/Lens/UploadPlaceholder.jsx
import React from "react";
import { Sparkles } from "lucide-react";

const UploadPlaceholder = () => {
  return (
    <>
      <div className="w-20 h-20 md:w-24 md:h-24 bg-[#c8a668]/10 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-[#c8a668]" />
      </div>

      <h2 className="text-xl md:text-2xl text-white font-semibold mb-3 text-center">
        Mulai Analisis Budaya
      </h2>
      <p className="text-[#c7c7c7] text-sm md:text-base mb-8 text-center max-w-md">
        Pilih cara untuk mengunggah foto objek budaya yang ingin Anda ketahui
      </p>
    </>
  );
};

export default UploadPlaceholder;
