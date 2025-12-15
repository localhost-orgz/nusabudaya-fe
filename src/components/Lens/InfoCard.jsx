import React from "react";
import { Info } from "lucide-react";

const InfoCard = () => {
  return (
    <div className="mt-8 bg-[#c8a668]/5 border border-[#c8a668]/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-[#c8a668] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-white font-semibold mb-2 text-sm md:text-base">
            Tips untuk hasil terbaik:
          </h3>
          <ul className="text-[#c7c7c7] text-xs md:text-sm space-y-1">
            <li>• Pastikan pencahayaan cukup dan objek terlihat jelas</li>
            <li>• Fokuskan kamera pada objek budaya utama</li>
            <li>• Hindari foto yang blur atau terlalu gelap</li>
            <li>• Objek budaya harus terlihat utuh dalam frame</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
