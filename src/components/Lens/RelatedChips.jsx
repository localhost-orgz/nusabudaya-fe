import React from "react";

const RelatedChips = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-[#1a2832] text-[#c8a668] text-sm rounded-lg border border-[#c8a668]/30 hover:bg-[#c8a668]/10 transition-colors cursor-pointer"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default RelatedChips;
