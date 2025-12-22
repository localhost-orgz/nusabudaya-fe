"use client";

import React, { useState, useRef, Suspense } from "react";
import { Upload, Download, X, Layers, Box, Sparkles } from "lucide-react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import HeaderSection from "@/components/HeaderSection";
import GuideMockup from "@/components/Mockup/GuideMockup";

function BatikModel({ modelPath, textureUrl }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const texture = textureUrl
    ? useLoader(THREE.TextureLoader, textureUrl)
    : null;

  React.useEffect(() => {
    if (gltf) {
      if (texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              metalness: 0,
              roughness: 1,
            });
          }
        });
      } else {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x333333,
              roughness: 1,
            });
          }
        });
      }
    }
  }, [textureUrl, gltf, texture]);

  return <primitive object={gltf.scene} />;
}

function LoadingModel() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#c8a668" wireframe />
    </mesh>
  );
}

function ModelCanvas({ modelPath, textureUrl, cameraPosition, cameraFov }) {
  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={cameraFov}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#c8a668" />

      <Suspense fallback={<LoadingModel />}>
        <BatikModel modelPath={modelPath} textureUrl={textureUrl} />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        makeDefault
        minDistance={1}
        maxDistance={5}
      />
      <Environment preset="city" environmentIntensity={0.5} />
    </Canvas>
  );
}

// --- Main Designer Component ---
const MockupBatik = () => {
  const [uploadedPattern, setUploadedPattern] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const fileInputRef = useRef(null);

  const mockups = [
    {
      id: "tshirt",
      name: "Modern T-Shirt",
      model: "/models/baju.glb",
      pos: [0, 0, 1.8],
      fov: 40,
    },
    {
      id: "dress",
      name: "Elegant Dress",
      model: "/models/dress.glb",
      pos: [0, 0.8, 2.5],
      fov: 45,
    },
    {
      id: "bag",
      name: "Premium Tote",
      model: "/models/bag.glb",
      pos: [1.2, 0.5, 1.8],
      fov: 40,
    },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedPattern(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (id) => alert(`Memproses export 3D untuk ${id}... 🚀`);

  return (
    <div className="min-h-screen bg-[#05121b] text-slate-200">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        <HeaderSection
          breadcrumb="Mockup Center"
          sectionTitle="NusaDesign 3D"
          description="Transformasi motif tradisional ke produk fashion masa kini."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* 🛠 SIDEBAR CONTROLS (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0D1922] border border-[#1e2f3d] rounded-2xl p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="text-[#c8a668] w-5 h-5" />
                <h2 className="text-xl font-bold tracking-tight">
                  Mockup Batik
                </h2>
              </div>

              {/* Upload Box */}
              {!uploadedPattern ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file?.type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setUploadedPattern(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-[#c8a668] bg-[#c8a668]/5"
                      : "border-[#1e2f3d] hover:border-[#c8a668]/50"
                  }`}
                >
                  <div className="bg-[#1a2832] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-[#c8a668]" />
                  </div>
                  <p className="font-medium text-white">Klik atau Drop Motif</p>
                  <p className="text-sm text-slate-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group rounded-xl overflow-hidden border border-[#c8a668]/30">
                    <img
                      src={uploadedPattern}
                      alt="Preview"
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setUploadedPattern(null)}
                        className="bg-red-500 p-3 rounded-full hover:scale-110 transition-transform"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#c8a668]/10 rounded-lg border border-[#c8a668]/20 text-[#c8a668] text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Motif siap diterapkan ke model 3D!</span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <GuideMockup />
            </div>
          </aside>

          {/* 🎭 MAIN PREVIEW (8 Cols) */}
          <main className="lg:col-span-8">
            {!uploadedPattern ? (
              <div className="bg-[#0D1922] border border-[#1e2f3d] rounded-2xl h-[600px] flex flex-col items-center justify-center text-center p-8">
                <Box className="w-20 h-20 stroke-[#c7c7c7] mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Menunggu motif batik...{" "}
                </h3>
                <p className="text-slate-500 max-w-sm">
                  Upload motif batik kamu untuk memulai visualisasi produk
                  secara real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockups.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`bg-[#0D1922] border border-[#1e2f3d] rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:border-[#c8a668]/40 ${
                      idx === 0 ? "md:col-span-2 h-[500px]" : "h-[400px]"
                    }`}
                  >
                    <div className="p-4 flex justify-between items-center border-b border-[#1e2f3d] bg-[#0D1922]/50 backdrop-blur-md z-10">
                      <span className="text-sm font-bold tracking-tight text-white uppercase">
                        {m.name}
                      </span>
                      <button
                        onClick={() => handleDownload(m.id)}
                        className="p-2 hover:bg-[#c8a668]/10 rounded-lg text-[#c8a668] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grow relative bg-[#0a161f]">
                      <ModelCanvas
                        modelPath={m.model}
                        textureUrl={uploadedPattern}
                        cameraPosition={m.pos}
                        cameraFov={m.fov}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MockupBatik;
