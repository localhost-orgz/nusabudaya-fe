import { Camera, Upload } from "lucide-react";
import React from "react";

const UploadActionButton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      {/* Camera Button */}
      <button
        onClick={() => cameraInputRef.current?.click()}
        className="flex-1 bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
      >
        <Camera className="w-5 h-5" />
        <span>Ambil Foto</span>
      </button>

      {/* Gallery Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-4 px-6 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
      >
        <Upload className="w-5 h-5" />
        <span>Upload Galeri</span>
      </button>
    </div>
  );
};

export default UploadActionButton;
