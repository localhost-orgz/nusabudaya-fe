"use client";

import React from "react";
import Image from "next/image";
import { ISLANDS } from "@/constants/listIslands";
import { useUser } from "@/context/userContext";
import GoldEmblem from "@/app/loading/page";

function MyPositionCard({ activeTab, myPosition, totalAchiever, leaderboardData, isLoading }) {
  const { user, loading } = useUser();

  if (loading) return <GoldEmblem />;

  return (
    <div className="lg:w-[320px] order-1 lg:order-2">
      <div className="sticky top-8 flex flex-col gap-6">
        {/* Card Statistik Personal */}
        <div className="bg-linear-to-b from-[#1a2c38] to-[#0D1922] border border-(--color-secondary)/50 rounded-xl p-6 relative overflow-hidden group">
          {/* Background Decoration */}
          <div className="absolute -right-4 top-2 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
            <Image
              src={"/map/indonesia.svg"}
              className="w-50 h-50 "
              alt="bg"
              width={0}
              height={0}
            />
          </div>

          <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">
            Posisi Kamu
          </h3>

          {isLoading ? (
            <div className="h-20 bg-gray-700/50 animate-pulse rounded-lg"></div>
          ) : myPosition ? (
            <>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  #{myPosition}
                </span>
                <span className="text-xs text-gray-400">
                  /{totalAchiever}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10">
                <Image
                  src={user.avatar}
                  className="h-10 w-10 aspect-square object-cover rounded-full"
                  alt="bg"
                  width={0}
                  height={0}
                />
                <div>
                  <p className="text-white text-sm font-bold">Kamu</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  {activeTab === "global"
                    ? "Terus mainkan game untuk naik ke Top 10!"
                    : `Jelajahi permainan untuk mengumpulkan lencana-mu!`}
                </p>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 py-4">
              Kamu belum masuk ranking ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPositionCard;
