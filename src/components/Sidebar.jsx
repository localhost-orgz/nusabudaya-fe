"use client";
import { Map } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LIST_SIDEBAR } from "@/constants/listSidebar";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-64 p-5 h-full bg-(--color-primary) border-r border-(--color-secondary) fixed">
      {/* logo */}
      <div className="flex items-center justify-center gap-2">
        <img src="/logo.svg" alt="" className="w-8 h-8 " />
        <h1 className="font-semibold text-xl text-(--color-secondary)">
          NusaBudaya
        </h1>
      </div>
      <div className="w-[90%] border-b border-(--color-secondary) mx-auto my-5 opacity-50 rounded-full"></div>
      {/* Nav Item */}
      <div className="w-full flex flex-col space-y-2">
        {LIST_SIDEBAR.map((item, index) => {
          const active = pathname === item.path;

          return (
            <Link href={item.path} key={index}>
              <div
                className={`
                  h-full w-full rounded-lg flex items-center px-3 py-3 gap-1.5 
                  transition-all duration-200

                  ${
                    active
                      ? "bg-(--color-secondary) text-white"
                      : "bg-(--color-primary) text-white hover:bg-[color-mix(in_srgb,var(--color-secondary)_50%,transparent)]"
                  }
                `}
              >
                <item.icon
                  className={`w-5 h-5 
                    ${active ? "stroke-white" : "stroke-white"}
                  `}
                />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
