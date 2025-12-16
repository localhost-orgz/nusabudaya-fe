"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  RotateCw,
  Download,
  X,
  Shirt,
  ShoppingBag,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const BatikDesigner = () => {
  const [uploadedPattern, setUploadedPattern] = useState(null);
  const [selectedMockup, setSelectedMockup] = useState("tshirt");
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const mockups = [
    { id: "tshirt", name: "Long Sleeve T-Shirt", icon: Shirt },
    { id: "dress", name: "Woman Dress", icon: "👗" },
    { id: "bag", name: "Tote Bag", icon: ShoppingBag },
  ];

  useEffect(() => {
    if (uploadedPattern && canvasRef.current) {
      drawMockup();
    }
  }, [uploadedPattern, selectedMockup, rotation, scale]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPattern(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPattern(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawMockup = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      if (selectedMockup === "tshirt") {
        drawTShirt(ctx, img);
      } else if (selectedMockup === "dress") {
        drawDress(ctx, img);
      } else if (selectedMockup === "bag") {
        drawBag(ctx, img);
      }

      ctx.restore();
    };

    img.src = uploadedPattern;
  };

  const drawTShirt = (ctx, img) => {
    const centerX = 400;
    const centerY = 300;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // T-shirt body
    ctx.beginPath();
    ctx.moveTo(-120, -100);
    ctx.lineTo(120, -100);
    ctx.lineTo(120, 180);
    ctx.lineTo(-120, 180);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(-120, -100, 240, 280);
      ctx.restore();
    }

    // Collar
    ctx.beginPath();
    ctx.arc(0, -100, 30, 0, Math.PI, true);
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();
    ctx.stroke();

    // Left sleeve
    ctx.beginPath();
    ctx.moveTo(-120, -80);
    ctx.lineTo(-200, -80);
    ctx.lineTo(-190, 60);
    ctx.lineTo(-120, 60);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(-200, -80, 80, 140);
      ctx.restore();
    }

    // Right sleeve
    ctx.beginPath();
    ctx.moveTo(120, -80);
    ctx.lineTo(200, -80);
    ctx.lineTo(190, 60);
    ctx.lineTo(120, 60);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(120, -80, 80, 140);
      ctx.restore();
    }

    ctx.restore();
  };

  const drawDress = (ctx, img) => {
    const centerX = 400;
    const centerY = 300;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Dress body (A-line)
    ctx.beginPath();
    ctx.moveTo(-80, -120);
    ctx.lineTo(80, -120);
    ctx.lineTo(140, 180);
    ctx.lineTo(-140, 180);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(-140, -120, 280, 300);
      ctx.restore();
    }

    // Collar
    ctx.beginPath();
    ctx.arc(0, -120, 40, 0, Math.PI, true);
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();
    ctx.stroke();

    // Left sleeve
    ctx.beginPath();
    ctx.arc(-80, -90, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(-115, -125, 70, 70);
      ctx.restore();
    }

    // Right sleeve
    ctx.beginPath();
    ctx.arc(80, -90, 35, 0, Math.PI * 2);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(45, -125, 70, 70);
      ctx.restore();
    }

    ctx.restore();
  };

  const drawBag = (ctx, img) => {
    const centerX = 400;
    const centerY = 300;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Bag body
    ctx.beginPath();
    ctx.moveTo(-140, -100);
    ctx.lineTo(140, -100);
    ctx.lineTo(140, 160);
    ctx.lineTo(-140, 160);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (img.complete) {
      ctx.save();
      ctx.clip();
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(-140, -100, 280, 260);
      ctx.restore();
    }

    // Handles
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(-90, -100);
    ctx.bezierCurveTo(-90, -160, -50, -160, -50, -100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, -100);
    ctx.bezierCurveTo(50, -160, 90, -160, 90, -100);
    ctx.stroke();

    // Bottom detail
    ctx.beginPath();
    ctx.moveTo(-140, 140);
    ctx.lineTo(-20, 160);
    ctx.lineTo(20, 160);
    ctx.lineTo(140, 140);
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 45) % 360);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `batik-mockup-${selectedMockup}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleReset = () => {
    setUploadedPattern(null);
    setRotation(0);
    setScale(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#05121b] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <span className="text-[#c7c7c7] font-medium text-sm md:text-base">
              NusaBudaya /{" "}
              <span className="text-[#c8a668]">Batik Designer</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-3">
            Batik 3D Designer
          </h1>
          <p className="text-[#c7c7c7] text-sm md:text-base max-w-2xl">
            Upload motif batik Anda dan lihat bagaimana tampilannya pada
            berbagai produk fashion 3D
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-4">
                Upload Batik Pattern
              </h2>

              {!uploadedPattern ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-[#c8a668] bg-[#c8a668]/10"
                      : "border-[#5B5B5B] hover:border-[#c8a668]"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-[#c8a668] mx-auto mb-4" />
                  <p className="text-white mb-2">
                    Drag & drop atau klik untuk upload
                  </p>
                  <p className="text-[#c7c7c7] text-sm">
                    PNG, JPG, JPEG (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-[#5B5B5B]">
                    <img
                      src={uploadedPattern}
                      alt="Uploaded batik"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={handleReset}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <p className="text-[#c7c7c7] text-sm text-center">
                    Pattern uploaded successfully!
                  </p>
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

            {/* Mockup Selection */}
            {uploadedPattern && (
              <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">
                  Select Mockup
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {mockups.map((mockup) => {
                    const IconComp =
                      typeof mockup.icon === "string" ? null : mockup.icon;
                    return (
                      <button
                        key={mockup.id}
                        onClick={() => setSelectedMockup(mockup.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                          selectedMockup === mockup.id
                            ? "border-[#c8a668] bg-[#c8a668]/10"
                            : "border-[#5B5B5B] hover:border-[#c8a668]/50"
                        }`}
                      >
                        {IconComp ? (
                          <IconComp className="w-8 h-8 text-white mb-2" />
                        ) : (
                          <span className="text-4xl mb-2">{mockup.icon}</span>
                        )}
                        <span className="text-white text-xs text-center">
                          {mockup.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Controls */}
            {uploadedPattern && (
              <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">
                  Controls
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#c7c7c7] text-sm">Rotate (45°)</span>
                    <button
                      onClick={handleRotate}
                      className="p-2 bg-[#1a2832] hover:bg-[#243442] rounded-lg border border-[#5B5B5B] transition-colors"
                    >
                      <RotateCw className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#c7c7c7] text-sm">Zoom</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className="p-2 bg-[#1a2832] hover:bg-[#243442] rounded-lg border border-[#5B5B5B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ZoomOut className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleZoomIn}
                        disabled={scale >= 2}
                        className="p-2 bg-[#1a2832] hover:bg-[#243442] rounded-lg border border-[#5B5B5B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ZoomIn className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#5B5B5B]">
                    <button
                      onClick={handleDownload}
                      className="w-full bg-[#c8a668] hover:bg-[#d4b876] text-[#0D1922] font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Mockup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-[#0D1922] border border-[#5B5B5B] rounded-xl p-6 h-full">
              <h2 className="text-white font-semibold text-lg mb-4">
                3D Preview
              </h2>

              {!uploadedPattern ? (
                <div className="flex items-center justify-center h-[500px] md:h-[600px] border-2 border-dashed border-[#5B5B5B] rounded-lg">
                  <div className="text-center">
                    <Shirt className="w-16 h-16 md:w-20 md:h-20 text-[#5B5B5B] mx-auto mb-4" />
                    <p className="text-[#c7c7c7]">
                      Upload batik pattern to see preview
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center bg-linear-to-br from-[#1a2832] to-[#0D1922] rounded-lg border border-[#5B5B5B] overflow-auto">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatikDesigner;
