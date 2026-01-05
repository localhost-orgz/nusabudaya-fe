import GamesCard from "@/components/Arena/GamesCard";
import HeaderSection from "@/components/HeaderSection";
import { Gamepad2, Zap } from "lucide-react";
import React from "react";

const page = () => {
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
            Ringkasan Statistik
          </span>
        </div>
        <div className="w-full gap-4 grid md:grid-cols-4 grid-cols-1">
          <div className="w-70 border border-[#5B5B5B] bg-[#0D1922] rounded-lg p-3 hover:border-(--color-secondary) hover:bg-[#101b27] gap-1">
            <div className="flex items-center gap-1">
              {/* <Zap strokeWidth={1.5} className="stroke-[#c7c7c7] w-5 h-5" /> */}
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
              1.600
            </span>
          </div>
          <div className="w-70 border border-[#5B5B5B] bg-[#0D1922] rounded-lg p-3 flex flex-col gap-1 hover:border-(--color-secondary) hover:bg-[#101b27]">
            <div className="flex items-center gap-1">
              <Gamepad2 className="stroke-[#c7c7c7] w-5 h-5" />
              <span className="text-[#c7c7c7] font-medium text-md">
                Game Sudah Dimainkan
              </span>
            </div>
            <span className="text-2xl font-semibold text-(--color-secondary) ml-6">
              32
            </span>
          </div>
        </div>
      </div>

      {/* games */}

      <div className="w-full mt-10">
        <div className="flex items-center gap-2 my-5">
          <div className="h-7 border-2 rounded-full border-(--color-secondary)"></div>
          <span className="text-lg text-white font-medium">
            Permainan yang Tersedia
          </span>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
          <GamesCard
            gameRole={"ingatan"}
            gameName={"Kartu Memori"}
            gameDescription={
              "Memasangkan pasangan kartu dengan gambar barang tradisional, simbol tradisional, atau budaya elemen lainnya. Belajar sambil latih ingatan kamu."
            }
            gameExp={75}
            gameDuration={1}
          />
          <GamesCard
            gameRole={"visual"}
            gameName={"Tebak Gambar"}
            gameDescription={
              "Menebak gambar mengenai adat dan budaya tradisional dari provinsi yang kamu pilih. Belajar lewat visual kamu!"
            }
            gameExp={75}
            gameDuration={1}
          />
          <GamesCard
            gameRole={"pengetahuan"}
            gameName={"Kuis"}
            gameDescription={
              "Melatih pengetahuan kamu seputar adat dan budaya melalui pertanyaan-pertanyaan menarik yang bisa melatih dan mengukur kemampuan kamu."
            }
            gameExp={75}
            gameDuration={1}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
