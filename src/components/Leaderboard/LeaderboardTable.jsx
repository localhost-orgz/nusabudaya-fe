"use client";

import React from "react";

import LeaderboardBody from "./LeaderboardBody";
import LeaderboardTitle from "./LeaderboardTitle";

function LeaderboardTable({ activeTab, leaderboardData, isLoading }) {
  return (
    <div className="flex-1 order-2 lg:order-1">
      <div className="w-full bg-[#0D1922] border border-[#5B5B5B] rounded-xl overflow-hidden shadow-lg">
        {/* Table Title Bar */}
        <LeaderboardTitle activeTab={activeTab} />

        <LeaderboardBody
          activeTab={activeTab}
          leaderboardData={leaderboardData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default LeaderboardTable;
