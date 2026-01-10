"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LIST_SIDEBAR } from "@/constants/listSidebar";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import ProfileModal from "./Profile/ProfileModal";
import SidebarProfile from "./SidebarProfile";
import { useUser } from "@/context/userContext";
import { useGameResultStore } from "@/stores/gameResultStore";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, loading, logout } = useUser();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { totalXp } = useGameResultStore();

  const isChildActive = (children) =>
    children?.some((child) => pathname.startsWith(child.path));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (loading) return <SidebarSkeleton />;

  return (
    <>
      {/* Mobile Menu Button - Fixed at top left */}

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-9999 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-(--color-primary) border-r border-(--color-secondary) z-9999
        flex flex-col
        transition-transform duration-300 ease-in-out
        w-64
        lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <button
          onClick={toggleMobileMenu}
          /* 💡 UBAH DISINI: md:hidden jadi lg:hidden */
          /* Biar tombol X nya tetep muncul di tablet pas menu kebuka */
          className={`lg:hidden absolute top-4 z-10001 bg-[#0D1922] border border-(--color-secondary) p-2.5 rounded-lg shadow-lg -right-15`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 stroke-white" />
          ) : (
            <Menu className="w-6 h-6 stroke-white" />
          )}
        </button>
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-start gap-1 mb-4">
            <img src="/logo.svg" alt="" className="w-6 h-6" />
            <h1 className="font-semibold text-md text-(--color-secondary)">
              NusaBudaya
            </h1>
          </div>

          {/* Profile Section */}
          {user && (
            <SidebarProfile
              // onProfileModal={setIsProfileModalOpen}
              user={user}
              xp={totalXp}
            />
          )}

          {/* Navigation */}
          <div className="flex flex-col space-y-2 mt-4">
            {LIST_SIDEBAR.map((item, index) => {
              const active =
                pathname === item.path || isChildActive(item.children);

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
                            <Link
                              href={child.path}
                              key={idx}
                              onClick={closeMobileMenu}
                            >
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
                <Link href={item.path} key={index} onClick={closeMobileMenu}>
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

        {/* Logout Button */}
        <div className="px-5 py-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full cursor-pointer text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 px-3 py-2.5 group"
          >
            <LogOut className="w-5 h-5  " />
            <span className="font-medium ">Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </>
  );
};

const SidebarSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 h-full bg-(--color-primary) border-r border-(--color-secondary) z-9999 w-64 flex flex-col">
      <div className="flex-1 p-5 overflow-y-auto">
        {/* Logo Skeleton */}
        <div className="flex items-center justify-start gap-1 mb-4 animate-pulse">
          <div className="w-6 h-6 bg-white/10 rounded"></div>
          <div className="h-4 w-24 bg-white/10 rounded"></div>
        </div>

        {/* Profile Section Skeleton */}
        <div className="bg-[#0D1922] border border-(--color-secondary) rounded-xl p-4 mb-4 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white/10"></div>

            {/* Name and Role */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-white/10 rounded"></div>
              <div className="h-3 w-16 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        {/* Navigation Items Skeleton */}
        <div className="flex flex-col space-y-2 mt-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg animate-pulse"
            >
              <div className="w-5 h-5 bg-white/10 rounded"></div>
              <div className="h-4 w-24 bg-white/10 rounded"></div>
            </div>
          ))}

          {/* Dropdown Item Skeleton */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg animate-pulse">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-5 h-5 bg-white/10 rounded"></div>
                <div className="h-4 w-28 bg-white/10 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button Skeleton */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 w-full border border-red-500/20 bg-red-500/5 p-2 rounded-lg px-3 py-2.5 animate-pulse">
          <div className="w-5 h-5 bg-red-400/20 rounded"></div>
          <div className="h-4 w-16 bg-red-400/20 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
