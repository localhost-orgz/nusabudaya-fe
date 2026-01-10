"use client";

import { Crown, Medal, User, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";

function LeaderboardRow({ item, activeTab }) {
  console.log(item);
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-[#15232e] transition-colors group">
      {/* Rank */}
      <div className="col-span-2 flex justify-center">
        {item.rank === 1 ? (
          <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        ) : item.rank === 2 ? (
          <Medal className="w-6 h-6 text-gray-300" />
        ) : item.rank === 3 ? (
          <Medal className="w-6 h-6 text-orange-400" />
        ) : (
          <span className="font-bold text-gray-500 group-hover:text-white transition-colors">
            #{item.rank}
          </span>
        )}
      </div>
      {/* User */}
      <div className="col-span-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-800 border border-[#5B5B5B] flex items-center justify-center shrink-0">
          {item.user.picture ? (
            <Image
              src={item.user.picture}
              alt={
                `${item.user.firstName} ${item.user.lastName}` || "User Avatar"
              }
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <span className="font-medium text-gray-200 truncate text-sm">
          {item.user.firstName + " " + item.user.lastName}
        </span>
      </div>
      {/* Score/Date */}
      <div className="col-span-4 text-right">
        <span className="font-bold text-(--color-secondary) text-sm">
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default LeaderboardRow;
