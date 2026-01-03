"use client";

import React from "react";

function LeaderboardHeader({ activeTab }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-[#5B5B5B] bg-[#0D1922] text-gray-500 font-semibold text-xs uppercase">
      <div className="col-span-2 text-center">Rank</div>
      <div className="col-span-6">Player</div>
      <div className="col-span-4 text-right">
        {activeTab === "global" ? "Total XP" : "Waktu Perolehan"}
      </div>
    </div>
  );
}

export default LeaderboardHeader;
