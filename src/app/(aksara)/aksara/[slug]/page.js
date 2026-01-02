"use client";
import CanvasArea from "@/components/Aksara/CanvasArea";
import DrawingTools from "@/components/Aksara/DrawingTools";
import HeaderAksara from "@/components/Aksara/HeaderAksara";
import SubmitCanvas from "@/components/Aksara/SubmitCanvas";
import { LIST_AKSARA } from "@/constants/listAksara";
import { DollarRecognizer, Point } from "@/utils/dollar";
import { useCanvas } from "@/utils/useCanvas";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function AksaraPage() {
  const { slug } = useParams();
  const [color, setColor] = useState("#c8a668");
  const [thickness, setThickness] = useState(5);

  const { canvasRef, startDrawing, draw, stopDrawing, clearCanvas, points } = useCanvas(
    color,
    thickness
  );

  const handleCheck = () => {
    // console.log("DATA MASTER BARU:", JSON.stringify(points.map(p => [p.x, p.y])));
    const aksaraData = LIST_AKSARA.find(a => a.path.includes(slug));
    
    if (!aksaraData || !aksaraData.templatePoints) {
      alert("Template aksara belum tersedia!");
      return;
    }
  
    if (points.length < 10) {
      alert("Coretan terlalu pendek!");
      return;
    }
  
    try {
      const dr = new DollarRecognizer();
      let targetArray = aksaraData.templatePoints;
      while (Array.isArray(targetArray[0]) && Array.isArray(targetArray[0][0])) {
        targetArray = targetArray[0];
      }
  
      const templateAsPoints = targetArray.map(p => {
        if (Array.isArray(p) && p.length >= 2) {
          return new Point(p[0], p[1]);
        }
        return null;
      }).filter(p => p !== null);
  
      if (templateAsPoints.length < 2) {
        console.error("Daftar titik template tidak valid:", targetArray);
        alert("Data template aksara rusak.");
        return;
      }
  
      dr.AddGesture(aksaraData.labelAksara, templateAsPoints);
  
      const userAsPoints = points.map(p => new Point(p.x, p.y));
  
      const result = dr.Recognize(userAsPoints);
  
      if (result.Score > 0.8) {
        alert(`Bagus! Kamu berhasil menulis aksara ${result.Name}. Skor: ${Math.round(result.Score * 100)}%`);
      } else {
        alert(`Kurang tepat, skor kemiripan: ${Math.round(result.Score * 100)}%. Coba lagi!`);
      }
    } catch (error) {
      console.error("Error saat memproses recognizer:", error);
      alert("Terjadi kesalahan teknis.");
    }
  };

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

        <SubmitCanvas onCheck={handleCheck} />
      </main>
    </div>
  );
}

export default AksaraPage;
