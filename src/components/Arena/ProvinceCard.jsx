export default function ProvinceCard({ province }) {
  return (
    <div key={province.id} className="border border-[#5b5b5b] rounded-lg text-center flex flex-col items-center px-3 py-5 bg-[#161f28] hover:border-(--color-secondary) transition-all">
      <img
        src={province.icon_url}
        alt={province.name}
        className="w-14 h-14 object-contain mb-2"
      />
      <div className="px-2 py-0.5 rounded-full bg-(--color-secondary)/10 text-(--color-secondary) text-xs font-semibold mb-1">
        {province.badge || "Provinsi"}
      </div>
      <span className="text-white font-semibold text-sm text-center">{province.name}</span>
    </div>
  );
}