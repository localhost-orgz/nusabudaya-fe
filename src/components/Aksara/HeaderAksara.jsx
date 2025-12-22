"use client";
import { ChevronLeft, PencilRuler } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderAksara = ({ slug }) => {
  return (
    <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-4">
        <Link
          href="/aksara"
          className="flex items-center bg-(--color-secondary) text-white pl-2 pr-4 py-2 rounded-lg gap-1 hover:bg-[#c8a668]/80 transition-all active:scale-95"
        >
          <ChevronLeft size={20} />
          <span className="font-medium text-sm">Kembali</span>
        </Link>
        <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          Menulis Aksara{" "}
          <span className="text-(--color-secondary) capitalize font-bold">
            {slug}
          </span>
        </h1>
      </div>

      <button className="flex items-center gap-2 py-2 px-5 w-full md:w-auto justify-center rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 transition-all">
        <PencilRuler size={18} />
        <span className="text-sm font-medium">Tutorial</span>
      </button>
    </header>
  );
};

export default HeaderAksara;
