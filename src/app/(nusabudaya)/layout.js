import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>

      <main className="md:pl-64 h-screen md:min-h-screen">
        <div className="h-full w-full pb-[72px] md:pb-0">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
