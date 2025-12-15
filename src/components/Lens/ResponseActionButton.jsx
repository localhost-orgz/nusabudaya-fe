export default function ResponseActionButton({ onReset }) {
  return (
    <div className="p-6 md:p-8 border-t border-[#5B5B5B] flex flex-col sm:flex-row gap-3">
      <button
        onClick={onReset}
        className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-3 px-6 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Camera className="w-5 h-5" />
        Analisis Gambar Baru
      </button>
    </div>
  );
}
