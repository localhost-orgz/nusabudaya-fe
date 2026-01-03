"use client";

import React from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardRow from "./LeaderboardRow";

function LeaderboardBody({ activeTab, isLoading, leaderboardData }) {
  return (
    <>
      {/* Table Header */}
      <LeaderboardHeader activeTab={activeTab} />

      {/* Table Body */}
      <div className="divide-y divide-[#2a3b47]">
        {isLoading
          ? // Skeleton Loading
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-5 animate-pulse flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-700 rounded"></div>
              </div>
            ))
          : leaderboardData.map((item, index) => (
              <LeaderboardRow key={index} item={item} activeTab={activeTab} />
            ))}
      </div>
    </>
  );
}

export default LeaderboardBody;
