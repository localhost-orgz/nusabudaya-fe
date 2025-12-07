import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const DetailProvince = ({ province }) => {
  useGSAP(() => {
    gsap.fromTo(
      ".panel",
      {
        // 🔒 START: Sisi kanan (titik ke-2 & ke-3) di-squash ke kiri (0%)
        // Urutan: Kiri-Atas, Kanan-Atas, Kanan-Bawah, Kiri-Bawah
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        // 🔓 END: Sisi kanan geser ke 100%
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.inOut", // Pake inOut biar lebih smooth
      }
    );
  });
  return (
    <div className="panel w-[500px] h-full absolute z-1001 top-0 left-0 bg-white">
      <ul>
        {province.map((prov) => (
          <li className="my-1">{prov.capital}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailProvince;
