import { Zap } from "lucide-react";
import React from "react";

const SidebarProfile = ({ user, onProfileModal }) => {
  return (
    <div className="p-2 border-t border-(--color-secondary) bg-[#0a0f14]">
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)] p-2 rounded-lg transition-all"
        onClick={() => onProfileModal(true)}
      >
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-(--color-secondary) shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover aspect-square"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
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
          <div className="flex items-center gap-1.5 mt-0.5">
            <Zap className="w-3.5 h-3.5 fill-(--color-secondary) stroke-(--color-secondary)" />
            <span className="text-(--color-secondary) text-xs font-bold">
              {user.xp} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
