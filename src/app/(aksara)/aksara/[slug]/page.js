"use client";
import CanvasArea from "@/components/Aksara/CanvasArea";
import DrawingTools from "@/components/Aksara/DrawingTools";
import HeaderAksara from "@/components/Aksara/HeaderAksara";
import SubmitCanvas from "@/components/Aksara/SubmitCanvas";
import ResultModal from "@/components/Aksara/ResultModal";
import { LIST_AKSARA } from "@/constants/listAksara";
import { DollarRecognizer, Point } from "@/utils/dollar";
import { useCanvas } from "@/utils/useCanvas";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import AlertModal from "@/components/Aksara/AlertModal";
import ModalTutor from "@/components/Aksara/ModalTutor";
import { Info, X } from "lucide-react";

function AksaraPage() {
  const { slug } = useParams();
  const [color, setColor] = useState("#c8a668");
  const [thickness, setThickness] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);
  const [resultData, setResultData] = useState({
    isSuccess: false,
    score: 0,
    accuracy: 0,
    aksaraName: "",
  });
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    type: "error",
  });

  const { canvasRef, startDrawing, draw, stopDrawing, clearCanvas, points } =
    useCanvas(color, thickness);

  const aksaraData = LIST_AKSARA.find((a) => a.path === `/aksara/${slug}`);

  const handleCheck = () => {
    console.log(
      "DATA MASTER BARU:",
      JSON.stringify(points.map((p) => [p.x, p.y]))
    );

    if (!aksaraData || !aksaraData.templatePoints) {
      // alert("Template aksara belum tersedia!");
      setAlertData({
        title: "Error",
        message: "Template aksara belum tersedia.",
        type: "error",
      });
      setAlertOpen(true);
      return;
    }

    if (points.length < 10) {
      setAlertData({
        title: "Info",
        message: "Coretan terlalu pendek, coba lagi.",
        type: "info",
      });
      setAlertOpen(true);
      return;
    }

    try {
      const dr = new DollarRecognizer();
      let targetArray = aksaraData.templatePoints;
      while (
        Array.isArray(targetArray[0]) &&
        Array.isArray(targetArray[0][0])
      ) {
        targetArray = targetArray[0];
      }

      const templateAsPoints = targetArray
        .map((p) => {
          if (Array.isArray(p) && p.length >= 2) {
            return new Point(p[0], p[1]);
          }
          return null;
        })
        .filter((p) => p !== null);

      if (templateAsPoints.length < 2) {
        console.error("Daftar titik template tidak valid:", targetArray);
        // alert("Data template aksara rusak.");
        setAlertData({
          title: "Error",
          message: "Data template aksara rusak.",
          type: "error",
        });
        setAlertOpen(true);
        return;
      }

      dr.AddGesture(aksaraData.labelAksara, templateAsPoints);

      const userAsPoints = points.map((p) => new Point(p.x, p.y));

      const result = dr.Recognize(userAsPoints);
      const score = Math.round(result.Score * 100);

      setResultData({
        isSuccess: score >= 80,
        score: score,
        aksaraName: aksaraData.labelAksara,
      });
      setModalOpen(true);
    } catch (error) {
      console.error("Error saat memproses recognizer:", error);
      // alert("Terjadi kesalahan teknis.");
      setAlertData({
        title: "Error",
        message: "Terjadi Kesalahan Teknis",
        type: "error",
      });
      setAlertOpen(true);
    }
  };

  const handleRetry = () => {
    clearCanvas();
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleTutorial = () => {
    if (aksaraData?.tutorial) {
      setIsTutorialOpen(true);
    } else {
      setAlertData({
        title: "Info",
        message: "Tutorial menulis aksara ini belum tersedia.",
        type: "info",
      });
      setAlertOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-(--color-primary) text-white p-4 md:p-8 flex flex-col items-center">
      <HeaderAksara handleTutorial={handleTutorial} slug={slug} />

      {isDisclaimerOpen && (
        <div className="max-w-6xl w-full mb-5 rounded-lg p-3 bg-(--color-secondary)/30 border border-(--color-secondary) gap-3 flex items-start justify-start relative pr-12 transition-all">
          {/* 👇 PERBAIKAN DISINI: Tambah 'shrink-0' biar icon gak gepeng */}
          <Info className="stroke-[#c7c7c7] w-5 h-5 mt-0.5 shrink-0" />

          <span className="text-sm text-[#c7c7c7] leading-relaxed">
            Sistem ini menggunakan teknologi unistroke recognition. Jadi,
            pastikan garis tidak terputus saat menulis. Butuh contoh? Klik
            tombol Tutorial berwarna emas di atas.
          </span>

          {/* Tombol close tetap di posisi absolute */}
          <button
            onClick={() => setIsDisclaimerOpen(false)}
            className="absolute top-3 right-3 p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5 stroke-[#c7c7c7]" />
          </button>
        </div>
      )}

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

      <ResultModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        isSuccess={resultData.isSuccess}
        score={resultData.score}
        accuracy={resultData.accuracy}
        aksaraName={resultData.aksaraName}
        onRetry={handleRetry}
      />

      <ModalTutor
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        aksaraName={aksaraData?.labelAksara || "-"}
        tutorialImage={aksaraData?.tutorial}
      />

      <AlertModal
        isOpen={alertOpen}
        onClose={handleCloseAlert}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
      />
    </div>
  );
}

export default AksaraPage;
