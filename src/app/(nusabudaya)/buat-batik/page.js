"use client";
import HeaderSection from "@/components/HeaderSection";
import React, { useState } from "react";

function page() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="bg-(--color-primary) md:min-h-screen overflow-auto h-[calc(100vh-72px)] md:p-8 p-5">
      <HeaderSection
        sectionTitle={"NusaBatik"}
        description={
          "Buat batik kamu sendiri dengan upload referensi kamu, dan ketik batik seperti apa yang ingin kamu buat"
        }
        breadcrumb={"NusaBatik"}
      />

      <input />
    </main>
  );
}

export default page;
