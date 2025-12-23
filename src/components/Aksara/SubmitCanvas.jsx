import { DraftingCompass, ScanText } from "lucide-react";
import Link from "next/link";

const SubmitCanvas = () => {
  return (
    <aside className="w-full lg:w-1/4 order-3 flex flex-col space-y-3">
      <button className="flex w-full items-center justify-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary)/80 text-white py-4 rounded-lg font-bold shadow-lg shadow-(--color-secondary)/20 transition-all active:scale-95">
        <ScanText size={20} /> Periksa Aksara
      </button>
      <Link href={"/aksara"}>
        <button className="flex w-full items-center justify-center gap-2 bg-[#1a2832] hover:bg-[#243442] border border-[#c7c7c7]/30 text-white py-4 rounded-lg font-bold shadow-lg shadow-(--color-secondary)/20 transition-all active:scale-95">
          <DraftingCompass size={20} /> Pelajari Aksara Lain
        </button>
      </Link>
    </aside>
  );
};

export default SubmitCanvas;
