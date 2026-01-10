"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import indonesianData from "../../../public/id.json";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Cloud from "./Cloud";
import { PROVINCE_MARKERS } from "@/constants/MarkerPositions";
import AnimatedText from "../AnimatedText";
import SearchProvince from "./SearchProvince";
import DetailProvince from "./DetailProvince";
import AudioController from "./AudioController";
import Guide from "./Guide";
import { CircleQuestionMark } from "lucide-react";
import { provinceService } from "@/services/modules/province.service";

const MapComponent = () => {
  const [activeProv, setActiveProv] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const mapRef = useRef(null);
  const audioRefsRef = useRef(null);
  const markerRefs = useRef({});

  function handleCloseGuide() {
    setIsGuideOpen(false);
  }

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bounds = [
    [-13.92, 90.01],
    [9.91, 145.97],
  ];

  const getGeoJsonStyle = (originalIndex) => {
    const province = PROVINCE_MARKERS.find(
      (p) => p.originalIndex === originalIndex
    );
    const color = province?.neonColor || {
      className: "neon-province",
      fillColor: "#8a07fe",
      strokeColor: "#bf5fff",
    };

    return {
      fillColor: color.fillColor,
      fillOpacity: 0.08,
      color: color.strokeColor,
      weight: 3,
      className: `geo-fade-in ${color.className} z-999`,
    };
  };

  const handleSearchSelect = (prov) => {
    if (prov) handleMarkerClick(prov.position, prov.originalIndex);
  };

  const playSound = (soundType) => {
    if (!audioRefsRef.current) return;

    const audio = audioRefsRef.current[soundType];
    if (audio) {
      if (soundType === "hover" || soundType === "zoom") {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log("Gagal memutar audio: ", err));
      }
    }
  };

  // Desktop: Click to fly and show detail
  // Mobile: Double-click to fly and show detail
  const handleMarkerClick = async (position, originalIndex) => {
    if (mapRef.current) {
      playSound("zoom");
      mapRef.current.flyTo(position, 7, {
        duration: 1.5,
        easeLinearity: 0.25,
      });

      const feature = indonesianData.features[originalIndex];
      setActiveProv(feature);

      const provinceData = PROVINCE_MARKERS.find(
        (p) => p.originalIndex === originalIndex
      );

      if (provinceData) {
        const detail = await provinceService.getBySlug(provinceData.slug);
        setSelectedProvince(detail);
      }
    }
  };

  // Mobile: Single click shows GeoJSON + sound
  const handleMobileTap = (position, originalIndex, markerElement) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    // Double tap detection (within 300ms)
    if (tapLength < 300 && tapLength > 0) {
      // Double tap: Same behavior as desktop click
      handleMarkerClick(position, originalIndex);
      setLastTap(0); // Reset
    } else {
      // Single tap: Just show GeoJSON and play sound
      playSound("hover");
      const feature = indonesianData.features[originalIndex];
      setActiveProv(feature);

      // Open popup on single tap
      if (markerElement) {
        markerElement.openPopup();
      }

      setLastTap(currentTime);
    }
  };

  const handleClosePanel = () => {
    setSelectedProvince(null);
  };

  const handleAudioRefsReady = (refs) => {
    audioRefsRef.current = refs;
  };

  // Desktop hover handlers
  const handleMouseOver = (e, originalIndex) => {
    if (isMobile) return; // Skip on mobile

    playSound("hover");
    const feature = indonesianData.features[originalIndex];
    setActiveProv(feature);
    e.target.openPopup();
  };

  const handleMouseOut = (e) => {
    if (isMobile) return; // Skip on mobile

    setActiveProv(null);
    e.target.closePopup();
  };

  return (
    <main className="h-screen w-full relative">
      <MapContainer
        center={[-3.2889889859501693, 118.94523262448598]}
        zoom={6}
        minZoom={5.5}
        maxZoom={9}
        className="w-full h-full"
        maxBounds={bounds}
        maxBoundsViscosity={11}
        zoomSnap={0.5}
        wheelPxPerZoomLevel={500}
        ref={mapRef}
        zoomControl={false}
        tap={isMobile} // Enable tap on mobile
        tapTolerance={15} // Increase tap tolerance for mobile
        doubleClickZoom={false}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {activeProv && (
          <GeoJSON
            key={activeProv.properties.id || Math.random()}
            data={activeProv}
            style={getGeoJsonStyle(
              PROVINCE_MARKERS.find(
                (p) => indonesianData.features[p.originalIndex] === activeProv
              )?.originalIndex
            )}
          />
        )}

        {PROVINCE_MARKERS.map((prov) => {
          const isActive =
            activeProv === indonesianData.features[prov.originalIndex];
          const customMarkerIcon = L.icon({
            // Pake prov.customIcon, kalo kosong fallback ke default (misal sumatera.webp)
            iconUrl: prov.customIcon || "/sumatera.webp",
            iconSize: [43, 43],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            className: "rounded-full",
          });
          return (
            <Marker
              key={prov.originalIndex}
              position={prov.position}
              icon={customMarkerIcon}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[prov.originalIndex] = ref;
                }
              }}
              eventHandlers={{
                // Desktop: click to fly and show detail
                click: (e) => {
                  if (!isMobile) {
                    handleMarkerClick(prov.position, prov.originalIndex);
                  } else {
                    // Mobile: handle tap (single or double)
                    handleMobileTap(
                      prov.position,
                      prov.originalIndex,
                      e.target
                    );
                  }
                },
                // Desktop only: hover to show GeoJSON
                mouseover: (e) => handleMouseOver(e, prov.originalIndex),
                mouseout: handleMouseOut,
              }}
            >
              <Popup
                className="my-custom-popup"
                closeButton={false}
                autoClose={isMobile} // Auto close on mobile
                closeOnClick={isMobile}
              >
                {isActive && <AnimatedText text={prov.name} />}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Cloud />
      <SearchProvince onProvinceSelect={handleSearchSelect} />
      <AudioController onAudioRefsReady={handleAudioRefsReady} />
      <button
        onClick={() => setIsGuideOpen(!isGuideOpen)}
        className="fixed bottom-7 md:bottom-6 right-4 z-1000 bg-[color-mix(in_srgb,var(--color-primary)_90%,transparent)] backdrop-blur-md border border-(--color-secondary) p-2.5 md:p-3 rounded-full hover:bg-(--color-secondary) active:scale-95 transition-all duration-300 group shadow-lg"
      >
        <CircleQuestionMark className="w-6 h-6 stroke-white" />
      </button>
      {isGuideOpen && <Guide onClose={handleCloseGuide} />}
      {selectedProvince && (
        <DetailProvince
          province={selectedProvince}
          onClose={handleClosePanel}
        />
      )}
      {/* Mobile Hint - Shows briefly on first load */}
      {/* {isMobile && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-999 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-4 py-2 rounded-full border border-(--color-secondary) animate-pulse-slow">
            Tap: Preview • Double-tap: Details
          </div>
        </div>
      )} */}
    </main>
  );
};

export default MapComponent;
