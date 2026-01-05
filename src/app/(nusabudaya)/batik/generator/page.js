"use client";
import React, { useState, useRef } from "react";
import HeaderSection from "@/components/HeaderSection";
import PreviewArea from "@/components/BuatBatik/PreviewArea";
import UploadArea from "@/components/BuatBatik/UploadArea";

const BuatBatikPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setPrompt("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!selectedFile || !prompt.trim()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay 2 detik
      alert("request di sini ya lan wkwkw");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05121b] pb-20 md:pb-0">
      <div className="w-full h-full p-4 md:p-8">
        <HeaderSection
          breadcrumb="NusaBatik"
          sectionTitle="Ciptakan Motif Batik Modern dengan AI"
          description="Transformasikan ide kreatifmu menjadi desain batik autentik. Upload sketsa atau referensi visual, tambahkan deskripsi motif yang diinginkan, dan biarkan AI menciptakan karya batik unik untukmu."
        />

        <div className="w-full max-w-4xl mx-auto mt-8">
          {!imagePreview ? (
            <UploadArea
              inputRef={fileInputRef}
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : (
            <PreviewArea
              onSubmit={handleSubmit}
              prompt={prompt}
              setPrompt={setPrompt}
              imagePreview={imagePreview}
              onRemoveImage={handleRemoveImage}
              isLoading={isLoading}
            />
          )}

          {/* Hidden Input File */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </main>
  );
};

export default BuatBatikPage;
