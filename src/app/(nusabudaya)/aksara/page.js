import HeaderSection from "@/components/HeaderSection";
import { LIST_AKSARA } from "@/constants/listAksara";
import AksaraCard from "@/components/Aksara/AksaraCard"; // Import component tadi
import React from "react";

function page() {
  return (
    <main className="bg-(--color-primary) md:min-h-screen overflow-auto md:p-8 p-5">
      <HeaderSection
        sectionTitle={"Latihan Menulis Aksara"}
        description={"Belajar menulis aksara jawa dengan NusaAksara"}
        breadcrumb={"NusaAksara"}
      />

      {/* Grid Wrapper */}
      <div className="w-full p-1 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 mt-6">
        {LIST_AKSARA.map((item) => (
          // Tinggal panggil component-nya, logic animasi udah di dalem
          <AksaraCard key={item.labelAksara} item={item} />
        ))}
      </div>
    </main>
  );
}

export default page;
