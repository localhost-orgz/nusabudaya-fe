"use client";
import CanvasArea from "@/components/Aksara/CanvasArea";
import DrawingTools from "@/components/Aksara/DrawingTools";
import HeaderAksara from "@/components/Aksara/HeaderAksara";
import SubmitCanvas from "@/components/Aksara/SubmitCanvas";
import { useCanvas } from "@/utils/useCanvas";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function AksaraPage() {
  const { slug } = useParams();
  const [color, setColor] = useState("#c8a668");
  const [thickness, setThickness] = useState(5);

  const { canvasRef, startDrawing, draw, stopDrawing, clearCanvas } = useCanvas(
    color,
    thickness
  );

  return (
    <div className="min-h-screen bg-(--color-primary) text-white p-4 md:p-8 flex flex-col items-center">
      <HeaderAksara slug={slug} />

      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start">
        <DrawingTools
          clearCanvas={clearCanvas}
          setThickness={setThickness}
          setColor={setColor}
          color={color}
          thickness={thickness}
        />

        <CanvasArea
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
        />

        <SubmitCanvas />
      </main>
    </div>
  );
}

export default AksaraPage;
