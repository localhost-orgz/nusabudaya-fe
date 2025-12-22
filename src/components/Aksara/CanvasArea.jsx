import { LineSquiggle } from "lucide-react";

import React from "react";

const CanvasArea = ({ canvasRef, startDrawing, draw, stopDrawing }) => (
  <section className="w-full lg:w-2/4 order-1 lg:order-2">
    <div className="relative aspect-square w-full max-w-[500px] mx-auto bg-[#0D1922] border-2 border-dashed border-(--color-secondary)/30 rounded-lg overflow-hidden cursor-crosshair shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.01] select-none">
        <LineSquiggle className="w-64 h-64 text-white" />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full touch-none relative z-10"
      />
    </div>
    <p className="text-center text-white/40 text-xs mt-4 italic">
      Gunakan Mouse atau Jari untuk menulis
    </p>
  </section>
);

export default CanvasArea;
