"use client";
import GamesCard from "@/components/Arena/GamesCard";
import SearchProvince from "@/components/Arena/SearchProvince";
import HeaderSection from "@/components/HeaderSection";
import { useGameResultStore } from "@/stores/gameResultStore";
import { CircleStar, Gamepad2, Info, X, Zap } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useArenaStore } from "@/stores/arenaStore"; // 👈 Import store baru

const page = () => {
  // const [province, setProvince] = useState("");
  const { province, setProvince } = useArenaStore();
  const { totalXp, totalBadge } = useGameResultStore();
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="bg-(--color-primary) md:min-h-screen overflow-auto md:p-8 p-5">
      <HeaderSection
        breadcrumb={"NusaArena"}
        sectionTitle={"Asah Pengetahuan Budaya Melalui Permainan Interaktif"}
        description={
          "Uji kemampuan dan perluas wawasan budaya Indonesia melalui berbagai permainan edukatif. Kumpulkan XP dan jadilah ahli budaya Nusantara!"
        }
      />

      {/* statistik */}
      <div className="w-full my-5">
        <div className="flex items-center gap-2 my-5">
          <div className="h-7 border-2 rounded-full border-(--color-secondary)"></div>
          <span className="text-lg text-white font-medium">
            Statistik Pencapaian
          </span>
        </div>
        <div className="w-full gap-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          <div className="w-full border border-[#5B5B5B] bg-[#0D1922] rounded-lg p-3 hover:border-(--color-secondary) hover:bg-[#101b27] gap-1">
            <div className="flex items-center gap-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_895_58374)">
                  <path
                    d="M13 3V10H19L11 21V14H5L13 3Z"
                    stroke="#c7c7c7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_895_58374">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="text-[#c7c7c7] font-medium text-md">
                Total XP
              </span>
            </div>
            <span className="text-2xl font-semibold text-(--color-secondary) ml-6">
              {totalXp}
            </span>
          </div>
          <div className="w-full border border-[#5B5B5B] bg-[#0D1922] rounded-lg p-3 flex flex-col gap-1 hover:border-(--color-secondary) hover:bg-[#101b27]">
            <div className="flex items-center gap-1">
              <CircleStar className="stroke-[#c7c7c7] w-5 h-5" />
              <span className="text-[#c7c7c7] font-medium text-md">
                Total Lencana
              </span>
            </div>
            <span className="text-2xl font-semibold text-(--color-secondary) ml-6">
              {totalBadge}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 my-5">
        <div className="h-7 border-2 rounded-full border-(--color-secondary)"></div>
        <span className="text-lg text-white font-medium">Pilih Provinsi</span>
      </div>

      <SearchProvince province={province} onSetProvince={setProvince} />

      {/* games */}

      <div className="w-full mt-10">
        <div className="flex items-center gap-2 my-5">
          <div className="h-7 border-2 rounded-full border-(--color-secondary)"></div>
          <span className="text-lg text-white font-medium">
            Koleksi Permainan
          </span>
        </div>

        {isDisclaimerOpen && (
          <div className="w-full mb-5 rounded-lg p-3 bg-(--color-secondary)/30 border border-(--color-secondary) gap-3 flex items-start justify-start relative pr-12 transition-all">
            {/* 👇 PERBAIKAN DISINI: Tambah 'shrink-0' biar icon gak gepeng */}
            <Info className="stroke-[#c7c7c7] w-5 h-5 mt-0.5 shrink-0" />

            <span className="text-sm text-[#c7c7c7] leading-relaxed">
              Untuk masuk Leaderboard: Selesaikan 3 game di provinsi ini, dan
              harus mendapatkan skor 100% pada permainan Kartu Memori & Kuis.
            </span>

            {/* Tombol close tetap di posisi absolute */}
            <button
              onClick={() => setIsDisclaimerOpen(false)}
              className="absolute top-3 right-3 p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5 stroke-[#c7c7c7]" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {province ? (
            <>
              <GamesCard
                gameRole={"ingatan"}
                gameName={"Kartu Memori"}
                gameDescription={
                  "Pasangkan pasangan kartu dengan gambar barang tradisional, simbol tradisional, atau budaya elemen lainnya. Belajar sambil latih ingatan kamu."
                }
                gameExp={80}
                gameDuration={"1+"}
                province={province}
              />
              <GamesCard
                gameRole={"visual"}
                gameName={"Tebak Gambar"}
                gameDescription={
                  "Tebak gambar mengenai adat dan budaya tradisional dari provinsi yang kamu pilih. Belajar lewat visual kamu!"
                }
                gameExp={224}
                gameDuration={"5+"}
                province={province}
              />
              <GamesCard
                gameRole={"pengetahuan"}
                gameName={"Kuis"}
                gameDescription={
                  "Melatih pengetahuan kamu seputar adat dan budaya melalui pertanyaan-pertanyaan menarik yang bisa melatih dan mengukur kemampuan kamu."
                }
                gameExp={80}
                gameDuration={2}
                province={province}
              />{" "}
            </>
          ) : (
            <div className="lg:col-span-3 md:col-span-2 col-span-1 w-full h-50 flex items-center justify-center">
              <span className="font-medium text-xl text-gray-400">
                Pilih Provinsi Terlebih Dahulu
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
