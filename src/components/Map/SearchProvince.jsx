import { PROVINCE_MARKERS } from "@/constants/MarkerPositions";
import { Compass } from "lucide-react";
import React, { useState } from "react";

const SearchProvince = ({ onProvinceSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProvinces = PROVINCE_MARKERS.filter((prov) =>
    prov.name.toLowerCase().includes(query.toLowerCase())
  );

  // 🔎 Logic Pas Ngetik (Handle Change)
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    const exactMatch = PROVINCE_MARKERS.find(
      (prov) => prov.name.toLowerCase() === value.toLowerCase()
    );

    if (exactMatch) {
      onProvinceSelect(exactMatch);
      setIsOpen(false);
    }
  };

  const handleSelect = (prov) => {
    setQuery(prov.name);
    setIsOpen(false);
    onProvinceSelect(prov);
  };

  return (
    <div className="absolute top-3 left-3 z-1000 w-50">
      <div className="relative">
        <input
          type="text"
          name="province"
          value={query}
          placeholder="Cari Provinsi.."
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          className="bg-(--color-primary-90) text-white border border-(--color-secondary) focus:outline-none px-3 pl-8 py-2.5 rounded-lg text-sm placeholder:text-sm"
        />
        <Compass
          strokeWidth={1.5}
          className="w-5 h-5 absolute stroke-gray-400 top-1/2 -translate-y-1/2 left-2"
        />
        {isOpen && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute top-1/2 -translate-y-1/2 -right-5 text-white"
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && filteredProvinces.length > 0 && (
        <ul className="absolute drop-provinces top-12 left-0 w-[115%] mt-2backdrop-blur-md border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
          {filteredProvinces.map((prov) => (
            <li
              key={prov.id}
              onClick={() => handleSelect(prov)}
              className="px-4 py-2.5 text-sm hover:text-(--color-secondary) bg-(--color-primary) text-white cursor-pointer transition-colors border-b border-(--color-secondary) last:border-0"
            >
              {prov.name}
            </li>
          ))}
        </ul>
      )}
      {isOpen && query && filteredProvinces.length === 0 && (
        <div className="absolute top-10 left-0 w-[115%] mt-2 bg-(--color-primary) p-3 text-sm text-white rounded-lg border border-(--color-secondary) shadow-xl text-center">
          Provinsi tidak ada
        </div>
      )}
    </div>
  );
};

export default SearchProvince;
