import React from "react";

const HeaderSection = ({ breadcrumb, sectionTitle, description }) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6">
        <span className="text-[#c7c7c7] font-medium text-sm md:text-base">
          NusaBudaya / <span className="text-[#c8a668]">{breadcrumb}</span>
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-3">
          {sectionTitle}
        </h1>
        <p className="text-[#c7c7c7] text-sm md:text-base max-w-2xl">
          {description}
        </p>
      </div>
    </>
  );
};

export default HeaderSection;
