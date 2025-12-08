import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>

      <main className="md:pl-64 md:pb-0 pb-18 h-full">
        <div className="h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
