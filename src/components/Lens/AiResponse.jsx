import React from "react";
import { Camera, Sparkles } from "lucide-react";
import ResponseHeader from "./ResponseHeader";
import ResponseSection from "./ResponseSection";
import CharacteristicList from "./CharacteristicList";
import RelatedChips from "./RelatedChips";

const AiResponse = ({ response, onReset }) => {
  return (
    <div className="bg-[#0D1922] border border-[#c8a668] rounded-xl overflow-hidden">
      <ResponseHeader
        category={response.category}
        name={response.name}
        province={response.province}
        confidence={response.confidence}
      />

      {/* Content */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Description */}
        <ResponseSection title="Deskripsi">
          <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
            {response.description}
          </p>
        </ResponseSection>

        {/* Main Characteristics */}
        <ResponseSection title="Karakteristik Utama">
          <CharacteristicList items={response.mainCharacteristic} />
        </ResponseSection>

        {/* Cultural Meaning */}
        <ResponseSection title="Makna Budaya & Filosofi">
          <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
            {response.culturalMeaning}
          </p>
        </ResponseSection>

        {/* History */}
        <ResponseSection title="Sejarah">
          <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
            {response.history}
          </p>
        </ResponseSection>

        {/* Related Cultures */}
        <ResponseSection title="Budaya Terkait">
          <RelatedChips items={response.relatedCultures} />
        </ResponseSection>
      </div>

      {/* Action Buttons */}
      <div className="p-6 md:p-8 border-t border-[#5B5B5B] flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-3 px-6 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Analisis Gambar Baru
        </button>
        <button className="flex-1 bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  );
};

export default AiResponse;
