import { Minus, Palette, PenTool, Plus, Spline, Trash } from "lucide-react";
import React from "react";

const DrawingTools = ({
  thickness,
  setThickness,
  setColor,
  clearCanvas,
  color,
}) => {
  return (
    <aside className="w-full lg:w-1/4 space-y-4 order-2 lg:order-1">
      <div className="bg-[#0D1922] border border-(--color-secondary)/30 rounded-lg p-5 shadow-xl">
        <header className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
          <div className="p-1.5 bg-(--color-secondary)/20 rounded-lg text-(--color-secondary)">
            <PenTool size={16} />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-white/70">
            Pen Tools
          </span>
        </header>

        {/* slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-white/60">
            <div className="flex items-center gap-2 text-sm">
              <Spline size={16} /> <span>Ketebalan</span>
            </div>
            <span className="font-mono text-(--color-secondary) text-xs">
              {thickness}px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setThickness(Math.max(1, thickness - 1))}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minus size={14} />
            </button>
            <input
              type="range"
              min="1"
              max="25"
              value={thickness ?? 6}
              onChange={(e) => setThickness(parseInt(e.target.value))}
              className="accent-(--color-secondary) flex-1 cursor-pointer h-1.5 rounded-lg bg-white/10"
            />
            <button
              onClick={() => setThickness(Math.min(25, thickness + 1))}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Palette size={16} /> <span>Warna Pen</span>
            </div>
            <input
              type="color"
              value={color ?? "#c8a668"}
              onChange={(e) => setColor(e.target.value)}
              className="w-6 h-6 cursor-pointer appearance-none bg-transparent border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-white/20 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={clearCanvas}
        className="flex w-full items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all active:scale-95 text-sm font-semibold"
      >
        <Trash size={18} /> Bersihkan Canvas
      </button>
    </aside>
  );
};

export default DrawingTools;
