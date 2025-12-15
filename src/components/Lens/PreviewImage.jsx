import React from "react";
import { X } from "lucide-react";

const PreviewImage = ({ image, onReset }) => {
  return (
    <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Preview Gambar</h3>
        <button
          onClick={onReset}
          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
          title="Hapus gambar"
        >
          <X className="w-5 h-5 text-[#c7c7c7] group-hover:text-red-500" />
        </button>
      </div>

      <div className="relative w-full aspect-video bg-black/20 rounded-lg overflow-hidden">
        <img
          src={image}
          alt="Uploaded preview"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default PreviewImage;
