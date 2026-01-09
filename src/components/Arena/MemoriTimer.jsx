import React from "react";

const MemoriTimer = ({ timeLeft }) => {
  return (
    <div className="w-full flex flex-col items-start h-16 md:h-20 mt-3 md:mt-5 space-y-3 md:space-y-4">
      <span className="text-base md:text-lg text-white">
        Sisa Waktu: {timeLeft} detik
      </span>
      <div className="w-full rounded-full h-1.5 bg-gray-700">
        <div
          className="h-full rounded-full bg-[#c8a668] transition-all duration-1000"
          style={{ width: `${(timeLeft / 80) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MemoriTimer;
