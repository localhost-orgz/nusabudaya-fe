"use client";

import HeaderSection from "@/components/HeaderSection";
import React, { useEffect, useState, useRef } from "react";
import RegionSelector from "@/components/Leaderboard/RegionSelector";
import MyPositionCard from "@/components/Leaderboard/MyPositionCard";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("global");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi buat simulasi fetch data berdasarkan kategori (Tab)
  const fetchLeaderboard = async (slug) => {
    setIsLoading(true);

    // Simulasi delay jaringan
    setTimeout(() => {
      const isGlobal = slug === "global";

      const mockUsers = [
        { name: "Rara Jonggrang", avatar: null },
        { name: "Sangkuriang", avatar: null },
        { name: "Malin Kundang", avatar: null },
        { name: "Bawang Merah", avatar: null },
        { name: "Timun Mas", avatar: null },
        { name: "Gatot Kaca", avatar: null },
        { name: "Si Pitung", avatar: null },
        { name: "Lutung Kasarung", avatar: null },
      ];

      // Acak urutan biar kelihatan beda tiap pulau
      const shuffledUsers = [...mockUsers].sort(() => 0.5 - Math.random());

      const data = {
        top_leaderboard: shuffledUsers.slice(0, 5).map((u, i) => ({
          rank: i + 1,
          user: u,
          // Kalau global pake XP, kalau pulau pake Tanggal dapet badge
          score: isGlobal ? 2500 - i * 150 : `1${i} Mei 2025`,
          label: isGlobal ? "XP" : "Unlocked",
        })),
        my_position: {
          rank: isGlobal ? 12 : 8,
          user: { name: "Kamu", avatar: null },
          score: isGlobal ? 850 : "Terkunci",
          label: isGlobal ? "XP" : "Unlocked",
        },
      };

      setLeaderboardData(data.top_leaderboard);
      setMyPosition(data.my_position);
      setIsLoading(false);
    }, 500);
  };

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
          "Lihat posisimu di antara banyaknya penjelajah budaya Indonesia. Bandingkan pencapaian XP secara nasional atau tantang dirimu untuk menguasai setiap pulau dan raih badge eksklusif!"
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
          activeTab={activeTab}
        />
      </div>
    </main>
  );
}
