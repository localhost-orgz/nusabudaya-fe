import {
  LIST_GUIDE_MOCKUP_DESKTOP,
  LIST_GUIDE_MOCKUP_MOBILE,
} from "@/constants/listGuideMockup";
import { Info, Laptop, TabletSmartphone } from "lucide-react";
import React, { useState } from "react";

const GuideMockup = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  return (
    <div className="mt-10 pt-6 border-t border-[#1e2f3d]">
      <div className="flex items-center mb-4 gap-2">
        <Info className="w-4 h-4 stroke-slate-500" />
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest ">
          Petunjuk
        </h4>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">
          Pilih Device
        </span>
        <div className="w-full p-1 bg-[#0D1922] border border-white/10 rounded-lg flex relative mb-2">
          <button
            onClick={() => setIsDesktop(true)}
            className={`flex items-center gap-2 w-full justify-center py-2 rounded-lg transition-all duration-300 cursor-pointer ${
              isDesktop
                ? "bg-(--color-secondary) text-white shadow-lg shadow-(--color-secondary)/20"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span className="text-sm font-medium">Desktop</span>
          </button>

          <button
            onClick={() => setIsDesktop(false)}
            className={`flex items-center gap-2 w-full justify-center py-2 rounded-lg transition-all duration-300 cursor-pointer ${
              !isDesktop
                ? "bg-(--color-secondary) text-white shadow-lg shadow-(--color-secondary)/20"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <TabletSmartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Mobile</span>
          </button>
        </div>
        {(isDesktop ? LIST_GUIDE_MOCKUP_DESKTOP : LIST_GUIDE_MOCKUP_MOBILE).map(
          (item, index) => (
            <div
              key={index}
              className="w-full px-3 py-2 rounded-lg border bg-(--color-secondary)/20 border-(--color-secondary) flex items-center gap-3"
            >
              <div className="bg-(--color-secondary) text-sm w-fit p-1 rounded-full"></div>
              <span className="text-xs text-[#c7c7c7]">{item}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GuideMockup;
