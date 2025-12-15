import React from "react";

const CharacteristicList = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-[#1a2832] p-3 rounded-lg"
        >
          <div className="w-2 h-2 bg-[#c8a668] rounded-full mt-1.5 shrink-0"></div>
          <span className="text-[#c7c7c7] text-sm md:text-base">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default CharacteristicList;
