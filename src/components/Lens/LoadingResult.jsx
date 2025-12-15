import React from "react";
import { Loader2 } from "lucide-react";

const LoadingResult = () => {
  return (
    <div className="bg-[#0D1922] border border-[#c8a668] rounded-xl p-8 md:p-12">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-[#c8a668] animate-spin mb-4" />
        <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
          Menganalisis Gambar...
        </h3>
        <p className="text-[#c7c7c7] text-sm md:text-base text-center">
          AI sedang mengidentifikasi objek budaya dalam gambar Anda
        </p>
      </div>
    </div>
  );
};

export default LoadingResult;
