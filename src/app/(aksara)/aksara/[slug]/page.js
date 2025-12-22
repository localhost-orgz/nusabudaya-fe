"use client";
import HeaderAksara from "@/components/Aksara/HeaderAksara";
import {
  ChevronLeft,
  Minus,
  Palette,
  PenTool,
  Plus,
  ScanText,
  Spline,
  Trash,
  PencilRuler,
  LineSquiggle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

function AksaraPage() {
  const params = useParams();
  const slug = params.slug;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#c8a668");
  const [thickness, setThickness] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;

    // Setup canvas resolution berdasarkan ukuran parent biar responsive
    canvas.width = parent.clientWidth * 2;
    canvas.height = parent.clientHeight * 2;
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = thickness;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = thickness;
    }
  }, [color, thickness]);

  const getCoordinates = (nativeEvent) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (nativeEvent.touches && nativeEvent.touches.length > 0) {
      const touch = nativeEvent.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
    return { offsetX: nativeEvent.offsetX, offsetY: nativeEvent.offsetY };
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e.nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e.nativeEvent);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-(--color-primary) text-white p-4 md:p-8 flex flex-col items-center">
      {/* nav */}
      <HeaderAksara slug={slug} />

      {/* main */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start">
        {/* left */}
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
                  value={thickness}
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
                  value={color}
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

        {/* tengah */}
        <section className="w-full lg:w-2/4 order-1 lg:order-2">
          <div className="relative aspect-square w-full max-w-[500px] mx-auto bg-[#0D1922] border-2 border-dashed border-(--color-secondary)/30 rounded-lg overflow-hidden cursor-crosshair shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.01] select-none">
              <LineSquiggle className="w-64 h-64 text-white" />
            </div>
            <canvas
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              ref={canvasRef}
              className="w-full h-full touch-none relative z-10"
            />
          </div>
          <p className="text-center text-white/40 text-xs mt-4">
            Gunakan Mouse, Jari, atau Pen Stylus untuk menulis pada canvas di
            atas
          </p>
        </section>

        {/* right */}
        <aside className="w-full lg:w-1/4 order-3">
          <button className="flex w-full items-center justify-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary)/80 text-white py-4 rounded-lg font-bold shadow-lg shadow-(--color-secondary)/20 transition-all active:scale-95">
            <ScanText size={20} /> Periksa Aksara
          </button>
        </aside>
      </main>
    </div>
  );
}

export default AksaraPage;
