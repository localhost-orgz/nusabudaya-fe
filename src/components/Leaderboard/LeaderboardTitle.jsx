"use client";

import { Map, Trophy } from "lucide-react";
import React from "react";
import { ISLANDS } from "@/constants/listIslands";

function LeaderboardTitle({ activeTab }) {
  return (
    <div className="p-5 border-b border-[#5B5B5B] bg-[#101b27] flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {activeTab === "global" ? (
            <Trophy className="text-yellow-500 w-6 h-6" />
          ) : (
            <Map className="text-slate-400 w-6 h-6" />
          )}
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            {ISLANDS.find((i) => i.slug === activeTab)?.name} Leaderboard
          </h2>
        </div>
        <p className="text-xs text-gray-400 ml-8">
          {activeTab === "global"
            ? "Diurutkan berdasarkan total XP tertinggi"
            : "Urutan penjelajah yang berhasil menaklukkan pulau ini"}
        </p>
      </div>
    </div>
  );
}

export default LeaderboardTitle;
