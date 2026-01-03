"use client";

import React from "react";
import Image from "next/image";
import { ISLANDS } from "@/constants/listIslands";

function MyPositionCard({ activeTab, myPosition, isLoading }) {
  return (
    <div className="lg:w-[320px] order-1 lg:order-2">
      <div className="sticky top-8 flex flex-col gap-6">
        {/* Card Statistik Personal */}
        <div className="bg-linear-to-b from-[#1a2c38] to-[#0D1922] border border-(--color-secondary)/50 rounded-xl p-6 relative overflow-hidden group">
          {/* Background Decoration */}
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
            <Image
              src={
                ISLANDS.find((i) => i.slug === activeTab)?.image ||
                "/map/indonesia.svg"
              }
              alt="bg"
              width={120}
              height={120}
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
                  #{myPosition.rank}
                </span>
                <span className="text-xs text-gray-400">
                  / {activeTab === "global" ? "1.5k Players" : "500 Badges"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10">
                <img
                  src="https://i.pinimg.com/1200x/80/49/d9/8049d9da40247a22b73297710f275a79.jpg"
                  alt="profile"
                  className="h-10 w-10 aspect-square object-cover rounded-full"
                />
                <div>
                  <p className="text-white text-sm font-bold">Kamu</p>
                  <p className="text-(--color-secondary) text-xs mt-1">
                    {activeTab === "global"
                      ? `${myPosition.score} XP`
                      : `Status: ${myPosition.score}`}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  {activeTab === "global"
                    ? "Terus mainkan game untuk naik ke Top 10!"
                    : `Jelajahi peta ${
                        ISLANDS.find((i) => i.slug === activeTab)?.name
                      } untuk meningkatkan peringkat badge-mu!`}
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
