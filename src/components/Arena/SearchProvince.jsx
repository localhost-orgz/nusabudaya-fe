"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react"; // Pastiin install lucide-react dulu ya
import { LIST_PROVINCES } from "@/constants/listProvinces";

const SearchProvince = ({
  options = LIST_PROVINCES,
  label = "Pilih Provinsi",
  onSetProvince, // Callback function buat ngirim data slug ke parent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // 🔎 Filter logic: Case insensitive search
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 💡 Close dropdown kalo klik di luar component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSetProvince(option.slug); // Kirim slug ke parent
    setIsOpen(false);
    setSearchTerm(""); // Reset search pas udah pilih
  };

  return (
    <div className="relative w-72" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-(--color-primary) border border-[#5b5b5b] hover:border-blue-900 px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-900"
      >
        <span
          className={`text-sm ${
            selectedOption ? "text-white font-medium" : "text-gray-100"
          }`}
        >
          {selectedOption ? selectedOption.name : label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-100 mt-2 w-full bg-[#0D1922] border border-[#5b5b5b] rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Search Input */}
          <div className="p-2 border-b border-[#5b5b5b]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c7c7c7]" />
              <input
                type="text"
                placeholder="Cari provinsi..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-[#0D1922] border border-[#5b5b5b] rounded-md focus:outline-none focus:border-blue-500 focus:bg-[#0D1922/50] transition-colors placeholder:text-[#c7c7c7] caret-[#c7c7c7] text-[#c7c7c7]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* List Items */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.slug}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    selectedOption?.slug === option.slug
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-white"
                  }`}
                >
                  <span>{option.name}</span>
                  {selectedOption?.slug === option.slug && (
                    <Check className="w-4 h-4" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                Tidak ada provinsi yang ditemukan
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProvince;
