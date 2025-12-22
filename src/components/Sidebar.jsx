"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LIST_SIDEBAR } from "@/constants/listSidebar";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isChildActive = (children) =>
    children?.some((child) => pathname.startsWith(child.path));

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 p-5 h-full bg-(--color-primary) border-r border-(--color-secondary) fixed">
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

            // 🔹 NORMAL ITEM
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
