import React from "react";

const ResponseSection = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
        <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ResponseSection;
