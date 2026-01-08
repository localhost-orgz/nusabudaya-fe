"use client";

import { provinceService } from "@/services/modules/province.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GoldEmblem from "@/app/loading/page";
import GamesCard from "@/components/Arena/GamesCard";

export default function ArenaDetail() {
  const { slug } = useParams();
  const [province, setProvince] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProvince = async () => {
      try {
        const result = await provinceService.getBySlug(slug);
        setProvince(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProvince();
  }, [slug]);

  if (!province) return <GoldEmblem />;

  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-2 my-5">
        <div className="h-7 border-2 rounded-full border-(--color-secondary)"></div>
        <span className="text-lg text-white font-medium">
          Koleksi Permainan
        </span>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <GamesCard
          gameRole={"ingatan"}
          gameName={"Kartu Memori"}
          gameDescription={
            "Pasangkan pasangan kartu dengan gambar barang tradisional, simbol tradisional, atau budaya elemen lainnya. Belajar sambil latih ingatan kamu."
          }
          gameExp={75}
          gameDuration={1}
          province={province}
        />
        <GamesCard
          gameRole={"visual"}
          gameName={"Tebak Gambar"}
          gameDescription={
            "Tebak gambar mengenai adat dan budaya tradisional dari provinsi yang kamu pilih. Belajar lewat visual kamu!"
          }
          gameExp={75}
          gameDuration={1}
          province={province}
        />
        <GamesCard
          gameRole={"pengetahuan"}
          gameName={"Kuis"}
          gameDescription={
            "Melatih pengetahuan kamu seputar adat dan budaya melalui pertanyaan-pertanyaan menarik yang bisa melatih dan mengukur kemampuan kamu."
          }
          gameExp={75}
          gameDuration={1}
          province={province}
        />
      </div>
    </div>
  );
}
