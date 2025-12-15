export default function Description({ description }) {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
        <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
        Deskripsi
      </h3>
      <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
