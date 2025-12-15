"use client";
import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2,
  ArrowLeft,
  Info,
} from "lucide-react";

const NusaBudayaLens = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
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
    <main className="min-h-screen bg-[#05121b] md:pl-64 pb-[72px] md:pb-0">
      <div className="w-full h-full p-4 md:p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <span className="text-[#c7c7c7] font-medium text-sm md:text-base">
            NusaBudaya / <span className="text-[#c8a668]">NusaLens</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-3">
            NusaLens AI
          </h1>
          <p className="text-[#c7c7c7] text-sm md:text-base max-w-2xl">
            Upload atau ambil foto objek budaya Indonesia untuk mendapatkan
            informasi lengkap dan detail dari AI kami.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl">
          {!uploadedImage ? (
            // Upload Section
            <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6 md:p-8">
              <div className="flex flex-col items-center justify-center py-12 md:py-16">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#c8a668]/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-[#c8a668]" />
                </div>

                <h2 className="text-xl md:text-2xl text-white font-semibold mb-3 text-center">
                  Mulai Analisis Budaya
                </h2>
                <p className="text-[#c7c7c7] text-sm md:text-base mb-8 text-center max-w-md">
                  Pilih cara untuk mengunggah foto objek budaya yang ingin Anda
                  ketahui
                </p>

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

              {/* Info Card */}
              <div className="mt-8 bg-[#c8a668]/5 border border-[#c8a668]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#c8a668] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm md:text-base">
                      Tips untuk hasil terbaik:
                    </h3>
                    <ul className="text-[#c7c7c7] text-xs md:text-sm space-y-1">
                      <li>
                        • Pastikan pencahayaan cukup dan objek terlihat jelas
                      </li>
                      <li>• Fokuskan kamera pada objek budaya utama</li>
                      <li>• Hindari foto yang blur atau terlalu gelap</li>
                      <li>• Objek budaya harus terlihat utuh dalam frame</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Analysis Section
            <div className="space-y-6">
              {/* Image Preview Card */}
              <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">
                    Preview Gambar
                  </h3>
                  <button
                    onClick={handleReset}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                    title="Hapus gambar"
                  >
                    <X className="w-5 h-5 text-[#c7c7c7] group-hover:text-red-500" />
                  </button>
                </div>

                <div className="relative w-full aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* AI Analysis Result */}
              {isAnalyzing ? (
                <div className="bg-[#0D1922] border border-[#c8a668] rounded-xl p-8 md:p-12">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-[#c8a668] animate-spin mb-4" />
                    <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
                      Menganalisis Gambar...
                    </h3>
                    <p className="text-[#c7c7c7] text-sm md:text-base text-center">
                      AI sedang mengidentifikasi objek budaya dalam gambar Anda
                    </p>
                  </div>
                </div>
              ) : (
                aiResponse && (
                  <div className="bg-[#0D1922] border border-[#c8a668] rounded-xl overflow-hidden">
                    {/* Header with Badge */}
                    <div className="bg-gradient-to-r from-[#c8a668]/20 to-[#c8a668]/5 p-6 md:p-8 border-b border-[#c8a668]/30">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="inline-block px-3 py-1 bg-[#c8a668] text-[#0D1922] text-xs font-semibold rounded-full mb-3">
                            {aiResponse.category}
                          </div>
                          <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">
                            {aiResponse.name}
                          </h2>
                          <p className="text-[#c8a668] text-sm md:text-base">
                            Provinsi: {aiResponse.province}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-3xl md:text-4xl font-bold text-[#c8a668]">
                            {aiResponse.confidence}%
                          </div>
                          <div className="text-xs md:text-sm text-[#c7c7c7]">
                            Confidence
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
                          Deskripsi
                        </h3>
                        <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
                          {aiResponse.description}
                        </p>
                      </div>

                      {/* Main Characteristics */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
                          Karakteristik Utama
                        </h3>
                        <div className="space-y-2">
                          {aiResponse.mainCharacteristic.map((char, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 bg-[#1a2832] p-3 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-[#c8a668] rounded-full mt-1.5 shrink-0"></div>
                              <span className="text-[#c7c7c7] text-sm md:text-base">
                                {char}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cultural Meaning */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
                          Makna Budaya & Filosofi
                        </h3>
                        <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
                          {aiResponse.culturalMeaning}
                        </p>
                      </div>

                      {/* History */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
                          Sejarah
                        </h3>
                        <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed">
                          {aiResponse.history}
                        </p>
                      </div>

                      {/* Related Cultures */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#c8a668] rounded-full"></div>
                          Budaya Terkait
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {aiResponse.relatedCultures.map((culture, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-[#1a2832] text-[#c8a668] text-sm rounded-lg border border-[#c8a668]/30 hover:bg-[#c8a668]/10 transition-colors cursor-pointer"
                            >
                              {culture}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 md:p-8 border-t border-[#5B5B5B] flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 bg-[#1a2832] hover:bg-[#243442] text-white font-semibold py-3 px-6 rounded-lg border border-[#5B5B5B] transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Camera className="w-5 h-5" />
                        Analisis Gambar Baru
                      </button>
                      <button className="flex-1 bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Pelajari Lebih Lanjut
                      </button>
                    </div>
                  </div>
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
