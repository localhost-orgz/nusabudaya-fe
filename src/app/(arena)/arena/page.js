"use client"

import GamesCard from "@/components/Arena/GamesCard";
import ProvinceCard from "@/components/Arena/ProvinceCard";
import HeaderSection from "@/components/HeaderSection";
import { provinceService } from "@/services/modules/province.service";
import { Gamepad2, Zap } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const fetchProvince = async () => {
      const data = await provinceService.getAll();
      setProvinces(data);
    }

    fetchProvince();
  });
  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4">
      {provinces.map(province => (
        <Link key={province.id} href={`/arena/${province.slug}`}>
          <ProvinceCard province={province} />
        </Link>
      ))}
    </div>
  );
};

export default page;
