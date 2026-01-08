"use client"

import HeaderSection from "@/components/HeaderSection";
import Sidebar from "@/components/Sidebar";
import { useGameResultStore } from "@/stores/gameResultStore";
import { Gamepad2 } from "lucide-react";

export default function layout({ children }) {
  const { totalXp, totalBadge } = useGameResultStore();

  return (
    <>
      <div>
        <Sidebar />
      </div>
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
                <Gamepad2 className="stroke-[#c7c7c7] w-5 h-5" />
                <span className="text-[#c7c7c7] font-medium text-md">
                  Lencana
                </span>
              </div>
              <span className="text-2xl font-semibold text-(--color-secondary) ml-6">
                {totalBadge}
              </span>
            </div>
          </div>
        </div>

        {children}
      </main>
    </>
  );
}