// src/app/(nusabudaya)/lens/page.js
"use client";
import React, { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import HeaderSection from "@/components/HeaderSection";
import InfoCard from "@/components/Lens/InfoCard";
import UploadPlaceholder from "@/components/Lens/UploadPlaceholder";
import AiResponse from "@/components/Lens/AiResponse";
import LoadingResult from "@/components/Lens/LoadingResult";
import PreviewImage from "@/components/Lens/PreviewImage";

const NusaBudayaLens = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        analyzeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    setAiResponse(null);

    // Simulate AI analysis
    setTimeout(() => {
      setAiResponse({
        category: "Tarian Tradisional",
        name: "Tari Jaipong",
        province: "Jawa Barat",
        description:
          "Tari Jaipong adalah tarian rakyat modern dari Jawa Barat yang diciptakan oleh Gugum Gumbira pada tahun 1976. Tarian ini menggabungkan unsur-unsur dari berbagai tarian tradisional Sunda seperti Ketuk Tilu, Ronggeng, dan Topeng Banjet.",
        confidence: 94,
        culturalMeaning:
          "Tari Jaipong merupakan simbol kebebasan berekspresi dan kreativitas masyarakat Sunda. Filosofi di balik tarian ini adalah 'ngigel' atau bergoyang mengikuti irama kehidupan, mencerminkan sifat masyarakat Sunda yang ramah, terbuka, dan penuh kegembiraan. Gerakan-gerakannya melambangkan dinamika kehidupan yang selalu berubah namun tetap harmonis.",
        mainCharacteristic: [
          "Gerakan pinggul yang dinamis dan ekspresif (geol)",
          "Diiringi musik gamelan dengan tempo cepat dan energik",
          "Menggunakan kostum kebaya dan selendang berwarna cerah",
          "Ekspresi wajah yang ceria dan penuh semangat",
          "Improvisasi gerakan yang spontan dan kreatif",
        ],
        history:
          "Tari Jaipong diciptakan oleh seniman Gugum Gumbira pada tahun 1976 di Bandung, Jawa Barat. Awalnya, tarian ini dikembangkan sebagai upaya untuk memodernisasi tarian tradisional Sunda agar lebih diterima oleh generasi muda. Nama 'Jaipong' sendiri berasal dari bunyi instrumen gamelan yang mengiringi tarian ini. Sejak kemunculannya, Tari Jaipong dengan cepat menjadi populer dan telah dipentaskan di berbagai negara sebagai representasi budaya Indonesia.",
        relatedCultures: [
          "Tari Ketuk Tilu",
          "Tari Ronggeng",
          "Musik Degung",
          "Tari Topeng Banjet",
          "Gamelan Sunda",
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAiResponse(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-[#05121b] pb-20 md:pb-0">
      <div className="w-full h-full p-4 md:p-8">
        <HeaderSection
          breadcrumb="NusaLens"
          sectionTitle="NusaLens AI"
          description="Upload atau ambil foto objek budaya Indonesia untuk mendapatkan informasi lengkap dan detail dari AI kami."
        />

        {/* Main Content */}
        <div className="w-full">
          {!uploadedImage ? (
            // Upload Section
            <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6 md:p-8">
              <div className="flex flex-col items-center justify-center py-12 md:py-16">
                <UploadPlaceholder />

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  {/* Camera Button */}
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Ambil Foto</span>
                  </button>

                  {/* Gallery Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-4 px-6 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload Galeri</span>
                  </button>
                </div>

                {/* Hidden Inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <InfoCard />
            </div>
          ) : (
            // Analysis Section
            <div className="space-y-6">
              {/* Image Preview Card */}
              <PreviewImage image={uploadedImage} onReset={handleReset} />

              {/* AI Analysis Result */}
              {isAnalyzing ? (
                <LoadingResult />
              ) : (
                aiResponse && (
                  <AiResponse response={aiResponse} onReset={handleReset} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default NusaBudayaLens;
