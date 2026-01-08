import React from "react";

const FeatureHeader = () => {
  return (
    <div className="w-full max-w-4xl text-center mx-auto">
      <span className="uppercase text-center text-(--color-secondary) tracking-widest text-sm ">
        Fitur-Fitur
      </span>
      <h2 className="md:text-4xl text-3xl text-white mt-5 mb-2 font-extrabold md:w-full md:max-w-2xl mx-auto">
        Belajar Kekayaan Budaya Indonesia Jadi Lebih Seru
      </h2>
      <p className="text-[#b5b5b5] md:w-full md:max-w-3xl w-[90%] mx-auto text-md">
        Dari eksplorasi peta interaktif, tantangan seru berbasis game, sampai
        bantuan AI yang bikin belajar lebih mudah. Semua dirancang biar budaya
        Nusantara terasa lebih menarik.
      </p>
    </div>
  );
};

export default FeatureHeader;
