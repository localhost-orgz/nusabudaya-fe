import { ISLANDS } from "@/constants/listIslands";
import Image from "next/image";
import React from "react";

const IslandTabs = ({ onActiveTab, activeTab }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar">
      {ISLANDS.map((island) => {
        const isActive = activeTab === island.slug;
        return (
          <button
            key={island.id}
            onClick={() => onActiveTab(island.slug)}
            className={`
                  relative group min-w-[140px] h-40 rounded-xl border-2 p-3 flex flex-col items-center justify-center gap-3 transition-all duration-300 snap-center
                  ${
                    isActive
                      ? "bg-[#1a2c38] border-(--color-secondary) shadow-[0_0_15px_rgba(200,166,104,0.3)]"
                      : "bg-[#0D1922] border-[#5B5B5B] hover:border-gray-400 opacity-80 hover:opacity-100"
                  }
                `}
          >
            {/* Image Container */}
            <div
              className={`relative w-20 h-20 transition-transform duration-300 ${
                isActive
                  ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  : ""
              }`}
            >
              <Image
                src={island.image}
                alt={island.name}
                fill
                className={`object-contain ${
                  island.slug === "global" ? "p-0" : "p-1"
                }`}
              />
            </div>

            {/* Label */}
            <div className="text-center z-10">
              <span
                className={`text-sm font-bold block ${
                  isActive ? "text-(--color-secondary)" : "text-gray-300"
                }`}
              >
                {island.name}
              </span>
              {isActive && (
                <span className="text-[10px] text-gray-400 mt-1 block px-2 leading-tight">
                  {island.desc}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default IslandTabs;
