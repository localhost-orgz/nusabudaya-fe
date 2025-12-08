import { ChevronLeft } from "lucide-react";
import React from "react";

const DetailInfoProvince = ({ province, openInfo }) => {
  return (
    <>
      <div
        className="absolute inset-0 bg-black/20 z-9999"
        onClick={() => openInfo(false)}
      ></div>
      <div className="top-1/2 absolute z-10000 -translate-x-1/2 left-1/2 -translate-y-1/2 bg-(--color-primary) md:h-[95%] h-[calc(100vh-72px)] w-[90%] rounded-lg border border-(--color-secondary) p-5 overflow-auto">
        <div className="flex items-center gap-3">
          <div
            onClick={() => openInfo(false)}
            className="p-3 rounded-full border border-(--color-secondary) h-10 w-10 flex items-center justify-center"
          >
            <ChevronLeft className="stroke-white" />
          </div>
          <span className="md:text-xl text-lg font-semibold text-white">
            Informasi Budaya DKI Jakarta
          </span>
        </div>

        {/*  */}

        <div className="h-10 w-full mt-5 flex flex-col">
          <h1 className="md:text-2xl text-xl text-white font-bold mb-5">
            Provinsi DKI Jakarta
          </h1>

          <div className="w-full flex gap-5 md:justify-center flex-col lg:flex-row">
            <div className="md:w-1/4 w-1/2 mx-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/375px-Coat_of_arms_of_Jakarta.svg.png"
                alt=""
              />
            </div>
            <div className="lg:w-1/2 w-full flex flex-col">
              <h2 className="font-semibold text-xl mb-3 text-white">
                Informasi Detail
              </h2>
              <div className="space-y-1 mb-8">
                <div className="flex justify-between">
                  <span className="font-medium text-white">Ibu Kota:</span>
                  <span className="text-white">{province.ibuKotaProvinsi}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-medium">Luas Wilayah:</span>
                  <span>{province.luas}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-medium">Populasi:</span>
                  <span>{province.population} Jiwa</span>
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="w-full">
            <h1 className="text-2xl mt-7 text-white font-bold mb-5">
              Budaya DKI Jakarta
            </h1>
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col gap-5">
                <div className="md:w-[40%] w-[90%] mx-auto">
                  <img
                    src="https://storage.googleapis.com/storage-ajaib-prd-platform-wp-artifact/2021/01/xxx34.jpg"
                    className="w-full rounded-md"
                    alt=""
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <h5 className="text-[#f2ecd5] md:text-5xl text-4xl serif">
                    {province.tarianTradisional}
                  </h5>
                  <span className="uppercase text-xs tracking-widest text-white font-semibold">
                    {province.namaProvinsi}
                  </span>
                  <p className="text-[#c7c7c7] md:text-md text-sm text-justify mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, facere a dolor nobis, quas officiis dolorem
                    quibusdam magnam modi quod ipsam, numquam non saepe
                    consequuntur eligendi quo quaerat placeat neque.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInfoProvince;
