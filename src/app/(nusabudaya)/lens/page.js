"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, RefreshCw, Info, BookAlert } from "lucide-react"; // Nambah icon X untuk close camera
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

  // State untuk Camera Desktop
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. Detect Mobile Device saat component mount 📱
  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // 2. Handle Start Camera Stream (Desktop) 🎥
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        if (isCameraOpen && !isMobile) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Gagal mengakses kamera. Pastikan izin kamera diberikan.");
        setIsCameraOpen(false);
      }
    };

    if (isCameraOpen) {
      startCamera();
    }

    // Cleanup function: Matikan kamera saat component unmount atau isCameraOpen jadi false
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen, isMobile]);

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

  // 3. Logic Tombol "Ambil Foto" 🔘
  const handleCameraClick = () => {
    if (isMobile) {
      // Kalau Mobile: Buka native camera via input file
      cameraInputRef.current?.click();
    } else {
      // Kalau Desktop: Buka mode webcam di browser
      setIsCameraOpen(true);
    }
  };

  // 4. Capture Foto dari Webcam Desktop 📸
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      // Set ukuran canvas sesuai video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      // Flip horizontal kalau mau efek cermin (opsional), di sini kita normal aja
      // context.translate(canvas.width, 0);
      // context.scale(-1, 1);

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setUploadedImage(imageDataUrl);
      setIsCameraOpen(false); // Tutup kamera setelah capture
      analyzeImage(imageDataUrl);
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
    setIsCameraOpen(false);
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

        <div className="w-full p-4 border border-(--color-secondary) bg-(--color-secondary)/25 mb-5 -mt-3 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <BookAlert className="stroke-(--color-secondary) w-5 h-5" />
            <span className="uppercase text-(--color-secondary) font-bold tracking-wide">
              Disclaimer
            </span>
          </div>
          <p className="text-(--color-secondary)">
            NusaLens AI masih dalam tahap pengembangan dan penyempurnaan.
            Informasi yang dihasilkan bersifat referensi dan mungkin belum
            sepenuhnya akurat. Kami menyarankan pengguna untuk memverifikasi
            kembali informasi dengan sumber tepercaya.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full">
          {!uploadedImage ? (
            // Upload Section
            <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6 md:p-8 relative overflow-hidden">
              {/* Tampilan Kamera Desktop */}
              {isCameraOpen ? (
                <div className="flex flex-col items-center justify-center py-4 md:py-8 animate-in fade-in duration-300">
                  <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden border border-[#5B5B5B] shadow-2xl">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Overlay Guide Lines (Optional aesthetics) */}
                    <div className="absolute inset-0 border-[3px] border-white/20 m-8 rounded-lg pointer-events-none"></div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setIsCameraOpen(false)}
                      className="px-6 py-3 rounded-lg border border-[#5B5B5B] text-white hover:bg-[#1a2832] transition-colors flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Batal
                    </button>

                    <button
                      onClick={handleCapture}
                      className="px-8 py-3 rounded-lg bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-bold shadow-lg shadow-[#c8a668]/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Camera className="w-5 h-5" />
                      Capture
                    </button>
                  </div>
                </div>
              ) : (
                // Tampilan Default (Upload Placeholder)
                <div className="flex flex-col items-center justify-center py-12 md:py-16">
                  <UploadPlaceholder />

                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    {/* Camera Button */}
                    <button
                      onClick={handleCameraClick}
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
                </div>
              )}

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
                capture="environment" // Tetap dipakai untuk mobile
                onChange={handleFileUpload}
                className="hidden"
              />

              {!isCameraOpen && <InfoCard />}
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
        {/* Examples Section - Only show when no image uploaded */}
        {!uploadedImage && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-7 border-2 rounded-full border-[#c8a668]"></div>
              <h2 className="text-lg md:text-xl text-white font-semibold">
                Contoh Objek Budaya yang Dapat Dianalisis
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Tarian Tradisional", icon: "💃" },
                { name: "Rumah Adat", icon: "🏘️" },
                { name: "Pakaian Adat", icon: "👘" },
                { name: "Alat Musik", icon: "🎵" },
                { name: "Senjata Tradisional", icon: "⚔️" },
                { name: "Makanan Khas", icon: "🍜" },
                { name: "Kerajinan Tangan", icon: "🎨" },
                { name: "Upacara Adat", icon: "🎭" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0D1922] border border-[#5B5B5B] hover:border-[#c8a668] rounded-lg p-4 text-center transition-all duration-200 cursor-pointer group"
                >
                  <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
                  <div className="text-white text-sm md:text-base font-medium group-hover:text-[#c8a668] transition-colors">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default NusaBudayaLens;
