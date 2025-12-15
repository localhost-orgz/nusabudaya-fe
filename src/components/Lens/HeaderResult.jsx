export default function HeaderResult({ response }) {
  return (
    <div className="bg-linear-to-r from-[#c8a668]/20 to-[#c8a668]/5 p-6 md:p-8 border-b border-[#c8a668]/30">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-[#c8a668] text-[#0D1922] text-xs font-semibold rounded-full mb-3">
            {response.category}
          </div>
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">
            {response.name}
          </h2>
          <p className="text-[#c8a668] text-sm md:text-base">
            Provinsi: {response.province}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl md:text-4xl font-bold text-[#c8a668]">
            {response.confidence}%
          </div>
          <div className="text-xs md:text-sm text-[#c7c7c7]">Confidence</div>
        </div>
      </div>
    </div>
  );
}
