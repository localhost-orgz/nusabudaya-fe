"use client";

import HeaderSection from "@/components/HeaderSection";
import React, { useEffect, useState, useRef } from "react";
import RegionSelector from "@/components/Leaderboard/RegionSelector";
import MyPositionCard from "@/components/Leaderboard/MyPositionCard";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { provinceService } from "@/services/modules/province.service";
import { achievementService } from "@/services/modules/achievement.service";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("aceh");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [totalAchiever, setTotalAchiever] = useState(0);
  const [myPosition, setMyPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async (slug) => {
    setIsLoading(true);
  
    try {
      const province = await provinceService.getBySlug(slug);
  
      const achievements = await achievementService.getAll(province.id);
 
      setLeaderboardData(achievements.achievements);
  
      setMyPosition(achievements.user_rank);

      setTotalAchiever(achievements.total_achiever);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  console.log(leaderboardData);
  useEffect(() => {
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  return (
    <main className="bg-(--color-primary) min-h-screen md:p-8 p-5 pb-24 text-white">
      {/* Header */}
      <HeaderSection
        breadcrumb={"Leaderboard"}
        sectionTitle={"Papan Peringkat Penjelajah Budaya Nusantara"}
        description={
          "Lihat posisimu di antara banyaknya penjelajah budaya Indonesia. Bandingkan pencapaian XP secara nasional atau tantang dirimu untuk menguasai setiap provinsi dan raih lencana eksklusif!"
        }
      />

      <RegionSelector activeTab={activeTab} onActiveTab={setActiveTab} />

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <LeaderboardTable
          activeTab={activeTab}
          leaderboardData={leaderboardData}
          isLoading={isLoading}
        />

        <MyPositionCard
          isLoading={isLoading}
          myPosition={myPosition}
          totalAchiever={totalAchiever}
          leaderboardData={leaderboardData}
          activeTab={activeTab}
        />
      </div>
    </main>
  );
}
