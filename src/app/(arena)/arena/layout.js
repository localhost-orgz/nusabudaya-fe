import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>

      {/* 💡 UBAH DISINI: Ganti md:pl-64 jadi lg:pl-64 */}
      {/* Ini bikin tablet (md) tetep full width, baru pas laptop (lg) ada padding sidebar */}
      <main className="lg:pl-64 h-screen md:min-h-screen">
        <div className="h-full w-full lg:pb-0 custom-scrollbar">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
