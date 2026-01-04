"use client";
import React, { useState } from "react";
import { Zap, X, Mail, LogOut } from "lucide-react";
import Link from "next/link";

const MAP_IMAGES = {
  Sumatra: "/map/sumatra.svg",
  Jawa: "/map/jawa.svg",
  Kalimantan: "/map/kalimantan.svg",
  Sulawesi: "/map/sulawesi.svg",
  Papua: "/map/papua.svg",
  Maluku: "/map/maluku.svg",
  Bali: "/map/balinusa.svg",
};

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [isBadgesExpanded, setIsBadgesExpanded] = useState(false);
  if (!isOpen) return null;

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // ...
  };

  const INITIAL_LIMIT = 3;

  const displayedBadges = isBadgesExpanded
    ? user.achievements
    : user.achievements.slice(0, INITIAL_LIMIT);

  const getMapImage = (badgeText) => {
    const foundKey = Object.keys(MAP_IMAGES).find((key) =>
      badgeText.includes(key)
    );

    return foundKey ? MAP_IMAGES[foundKey] : "/map/jawa.svg";
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/10 z-9999 backdrop-blur-xs animate-in fade-in duration-200"
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-10000 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0D1922] w-full max-w-lg rounded-xl border border-[#c8a668] animate-in zoom-in duration-300 max-h-[80%] overflow-y-scroll custom-scrollbar"
        >
          {/* Header with gradient */}
          <div className="relative bg-linear-to-br from-[#c8a668]/20 to-[#c8a668]/5 p-6 border-b border-[#c8a668]/30">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#c7c7c7]" />
            </button>

            {/* Profile Picture */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-[#c8a668]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 bg-[#c8a668] hidden items-center justify-center text-white font-bold text-2xl"
                  style={{ display: "none" }}
                >
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              </div>

              {/* user data */}
              <div className="flex flex-col flex-1">
                {/* Name */}
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.name}
                </h2>

                {/* Email */}
                <div className="flex items-center gap-2 text-[#c7c7c7] text-sm">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>

                {/* badges section */}
                <div className="flex mt-2 items-start gap-2 text-[#c7c7c7] text-sm">
                  <span className="shrink-0">Badges: </span>
                  <div className="w-full flex flex-col items-start gap-2">
                    <div className="flex flex-wrap gap-1">
                      {displayedBadges.map((item, index) => (
                        <div
                          key={index}
                          className="px-2 py-0.5 bg-(--color-secondary)/20 border border-(--color-secondary) rounded-full text-xs text-(--color-secondary) animate-in fade-in duration-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Tombol Show More / Less */}
                    {user.achievements.length > INITIAL_LIMIT && (
                      <button
                        onClick={() => setIsBadgesExpanded(!isBadgesExpanded)}
                        className="text-[10px] text-white/50 hover:text-(--color-secondary) underline decoration-dotted underline-offset-4 transition-colors ml-1 cursor-pointer"
                      >
                        {isBadgesExpanded
                          ? "Tutup sebagian"
                          : `+${
                              user.achievements.length - INITIAL_LIMIT
                            } lainnya`}
                      </button>
                    )}
                  </div>
                </div>
                {/* */}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* XP Badge */}
            <div className="bg-(--color-primary) rounded-lg p-4 border border-[#5B5B5B]">
              <div className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#c8a668]/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 fill-[#c8a668] stroke-[#c8a668]" />
                  </div>
                  <div>
                    <p className="text-[#c7c7c7] text-sm">Total XP</p>
                    <p className="text-[#c8a668] text-2xl font-bold">
                      {user.xp}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <h4 className="text-lg text-white font-medium">Achievements</h4>

            <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
              {user.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="w-full h-full flex flex-col bg-[#0D1922] border border-[#5b5b5b] group rounded-lg"
                >
                  <div className="p-5">
                    <img
                      src={getMapImage(achievement)}
                      className="w-full aspect-square group-hover:scale-110 transition-all duration-300"
                      alt=""
                    />
                  </div>
                  <div className="bg-(--color-primary) flex flex-1 border-t border-[#5b5b5b] p-2 rounded-b-lg items-center justify-center">
                    {/* Tampilkan teks achievement */}
                    <span
                      className="text-[#c7c7c7] text-[10px] md:text-xs text-center font-medium  w-full"
                      title={achievement}
                    >
                      {achievement}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
