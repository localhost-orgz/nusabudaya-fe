"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LIST_SIDEBAR } from "@/constants/listSidebar";
import { usePathname } from "next/navigation";
import { ChevronDown, Zap } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isChildActive = (children) =>
    children?.some((child) => pathname.startsWith(child.path));

  const user = {
    name: "Ravinthranath A",
    email: "ravinthranath@gmail.com",
    xp: 1600,
    avatar:
      "https://i.pinimg.com/1200x/80/49/d9/8049d9da40247a22b73297710f275a79.jpg",
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-full bg-(--color-primary) border-r border-(--color-secondary) fixed">
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.svg" alt="" className="w-8 h-8" />
            <h1 className="font-semibold text-xl text-(--color-secondary)">
              NusaBudaya
            </h1>
          </div>

          <div className="w-[90%] border-b border-(--color-secondary) mx-auto my-5 opacity-50 rounded-full" />

          {/* Nav */}
          <div className="flex flex-col space-y-2">
            {LIST_SIDEBAR.map((item, index) => {
              const active =
                pathname === item.path || isChildActive(item.children);

              // 🔽 ITEM WITH DROPDOWN
              if (item.children) {
                const open = openDropdown === index;

                return (
                  <div key={index} className="space-y-1">
                    <button
                      onClick={() => setOpenDropdown(open ? null : index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition
                      ${
                        active
                          ? "bg-(--color-secondary) text-white"
                          : "text-white hover:bg-[color-mix(in_srgb,var(--color-secondary)_50%,transparent)]"
                      }
                    `}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5 stroke-white" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {open && (
                      <div className="ml-6 flex flex-col space-y-1">
                        {item.children.map((child, idx) => {
                          const childActive = pathname === child.path;

                          return (
                            <Link href={child.path} key={idx}>
                              <div
                                className={`px-3 py-2 rounded-md text-sm transition
                                ${
                                  childActive
                                    ? "bg-(--color-secondary) text-white"
                                    : "text-white opacity-80 hover:bg-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]"
                                }
                              `}
                              >
                                {child.label}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link href={item.path} key={index}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition
                    ${
                      active
                        ? "bg-(--color-secondary) text-white"
                        : "text-white hover:bg-[color-mix(in_srgb,var(--color-secondary)_50%,transparent)]"
                    }
                  `}
                  >
                    <item.icon className="w-5 h-5 stroke-white" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Profile Section - Sticky at bottom */}
        <div className="p-2 border-t border-(--color-secondary) bg-[#0a0f14]">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-(--color-secondary) shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover aspect-square"
                onError={(e) => {
                  // Fallback to initials if image fails to load
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
      </div>

      {/* Mobile Bottom Bar (NO DROPDOWN, SIMPLE ICONS) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-9999 bg-(--color-primary) border-t border-(--color-secondary) pb-safe">
        <div className="flex items-center justify-around px-4 py-3">
          {LIST_SIDEBAR.map((item, index) => {
            if (item.children) return null; // hide dropdown on mobile

            const active = pathname === item.path;

            return (
              <Link href={item.path} key={index}>
                <div
                  className={`p-3 rounded-lg transition ${
                    active ? "bg-(--color-secondary)" : ""
                  }`}
                >
                  <item.icon className="w-6 h-6 stroke-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
