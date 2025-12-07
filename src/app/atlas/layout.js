import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>

      <main className="pl-64 h-full">
        <div className="h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
