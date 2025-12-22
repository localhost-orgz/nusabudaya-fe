import { ScanText } from "lucide-react";

const SubmitCanvas = () => {
  return (
    <aside className="w-full lg:w-1/4 order-3">
      <button className="flex w-full items-center justify-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary)/80 text-white py-4 rounded-lg font-bold shadow-lg shadow-(--color-secondary)/20 transition-all active:scale-95">
        <ScanText size={20} /> Periksa Aksara
      </button>
    </aside>
  );
};

export default SubmitCanvas;
