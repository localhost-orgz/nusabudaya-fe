import { ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const SidebarProfile = ({ user, onProfileModal }) => {
  if (!user) return null;
  return (
    <div className="rounded-lg mt-6 mb-2">
      <div
        className="flex items-center gap-3 p-2 px-3 cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)] rounded-lg transition-all"
        onClick={() => onProfileModal(true)}
      >
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-(--color-secondary) shrink-0">
          <Image
            src={user.avatar}
            alt={user.name ?? "User"}
            width={96}
            height={96}
            className="object-cover rounded-full"
          />

          <div
            className="absolute inset-0 bg-(--color-secondary) hidden items-center justify-center text-white font-bold text-lg"
            style={{ display: "none" }}
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {user.name}
          </p>
          <div className="flex items-center gap-0.5 mt-0.5">
            <Zap className="w-3.5 h-3.5 fill-(--color-secondary) stroke-transparent" />
            <span className="text-(--color-secondary) text-xs tracking-wider">
              {user.xp} XP
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 stroke-white" />
      </div>
    </div>
  );
};

export default SidebarProfile;
