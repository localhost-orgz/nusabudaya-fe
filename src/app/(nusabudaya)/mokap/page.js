"use client";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Upload, X, Layers, Info } from "lucide-react";

// --- 🔎 Komponen Render Model 3D ---
const BatikModel = ({
  modelPath,
  texturePath,
  position,
  label,
  scale = 1.5,
}) => {
  const { scene } = useGLTF(modelPath);
  const texture = useTexture(texturePath || "/pattern.jpg"); // Fallback pattern

  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      texture.anisotropy = 16;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  return (
    <group position={position}>
      <Html position={[0, 2.5, 0]} center>
        <div className="bg-[#c8a668] text-[#0D1922] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xl border border-white/20 whitespace-nowrap">
          {label}
        </div>
      </Html>
      <primitive object={scene} scale={scale} />
    </group>
  );
};

const LoadingShowroom = () => (
  <Html center>
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-[#c8a668] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-sm font-bold tracking-[0.2em] animate-pulse">
        MEMPERSIAPKAN SHOWROOM...
      </p>
    </div>
  </Html>
);

const BatikDesigner = () => {
  const [uploadedPattern, setUploadedPattern] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedPattern(url);
    }
  };

  const handleReset = () => {
    setUploadedPattern(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    // ✅ Pake h-screen + flex-col biar layout pas satu halaman penuh
    <div className="h-screen bg-[#05121b] flex flex-col overflow-hidden">
      {/* Header / Navbar */}
      <div className="p-4 md:p-6 w-full shrink-0">
        <div className="max-w-7xl mx-auto bg-[#0D1922]/50 backdrop-blur-md border border-[#5B5B5B] rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-[#c8a668] p-2 rounded-lg">
              <Layers className="w-5 h-5 text-[#0D1922]" />
            </div>
            <div>
              <h1 className="text-xl text-white font-bold leading-none">
                Batik Designer
              </h1>
              <p className="text-[#c7c7c7] text-[10px] mt-1 italic">
                NusaBudaya Showroom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!uploadedPattern ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                Upload Batik
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[#1a2832] border border-[#5B5B5B] p-1 pr-3 rounded-lg">
                <img
                  src={uploadedPattern}
                  className="w-8 h-8 object-cover rounded border border-[#c8a668]"
                />
                <button
                  onClick={handleReset}
                  className="text-red-400 text-[10px] font-bold uppercase hover:text-red-300"
                >
                  Hapus
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* ✅ Canvas Area: Pake flex-1 biar makan sisa ruang layar */}
      <div className="flex-1 w-full relative">
        <div className="absolute top-4 left-8 z-10 pointer-events-none opacity-50">
          <div className="flex items-center gap-2 text-[#c8a668] mb-1">
            <Info className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Showroom Mode
            </span>
          </div>
        </div>

        <Canvas
          shadows
          camera={{ position: [0, 1.5, 10], fov: 40, near: 0.1, far: 2000 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.7} />
          <spotLight
            position={[10, 20, 10]}
            angle={0.2}
            penumbra={1}
            intensity={3}
            castShadow
          />
          <Environment preset="apartment" />

          <Suspense fallback={<LoadingShowroom />}>
            <group position={[0, -2, 0]}>
              {/* 👕 Kemeja (Kiri) */}
              <BatikModel
                label="Kemeja Pria"
                modelPath="/models/bajuBatik.glb"
                texturePath={uploadedPattern}
                position={[-4.5, 0, 0]}
                scale={2}
              />

              {/* 👗 Dress (Tengah) - Menggunakan file kemeja karena dress.glb tidak ditemukan */}
              <BatikModel
                label="Wanita Dress"
                modelPath="/models/bajuBatik.glb"
                texturePath={uploadedPattern}
                position={[0, 0, 0]}
                scale={2}
              />

              {/* 👜 Tote Bag (Kanan) */}
              <BatikModel
                label="Tote Bag"
                modelPath="/models/tote_bag.glb"
                texturePath={uploadedPattern}
                position={[4.5, 0.5, 0]}
                scale={1.8}
              />
            </group>
          </Suspense>

          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={20}
            blur={2.5}
            far={5}
          />

          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={4}
            maxDistance={15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      <div className="p-4 text-center shrink-0">
        <p className="text-[#5B5B5B] text-[8px] uppercase tracking-[0.3em]">
          NusaBudaya 3D Studio &bull; 2025
        </p>
      </div>
    </div>
  );
};

export default BatikDesigner;
