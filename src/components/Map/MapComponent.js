"use client";

import React, { useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import indonesianData from "../../../public/id.json";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Cloud from "./Cloud";
import { PROVINCE_MARKERS } from "@/constants/MarkerPositions";
import AnimatedText from "../AnimatedText";
import SearchProvince from "./SearchProvince";
import DetailProvince from "./DetailProvince";
import { getProvinceByName } from "@/constants/listDetail";

const MapComponent = () => {
  const [activeProv, setActiveProv] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const mapRef = useRef(null);

  const defaultIcon = L.icon({
    iconUrl: "/sumatera.webp",
    iconSize: [43, 43],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: "rounded-full",
  });

  // boundary indonesia
  const bounds = [
    [-13.92, 90.01],
    [9.91, 145.97],
  ];

  // [Styling GeoJSON with NEON effect] - now using hardcoded colors
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

  // Flyto province yang dipilih
  const handleMarkerClick = (position, originalIndex) => {
    if (mapRef.current) {
      // Fly to posisi marker
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
        const DetailData = getProvinceByName(provinceData.name);
        setSelectedProvince(DetailData);
      }
    }
  };

  return (
    <main className="h-screen w-full relative">
      <MapContainer
        center={[-3.2889889859501693, 118.94523262448598]} // koordinat awal
        zoom={6} // level zoom awal
        minZoom={5.5} // batas untuk zoom out
        maxZoom={9}
        className="w-full h-full" // class map
        maxBounds={bounds}
        maxBoundsViscosity={11}
        zoomSnap={0.5}
        wheelPxPerZoomLevel={500}
        ref={mapRef}
        zoomControl={false}
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

          return (
            <Marker
              key={prov.originalIndex}
              position={prov.position}
              icon={defaultIcon}
              eventHandlers={{
                click: () =>
                  handleMarkerClick(prov.position, prov.originalIndex),
                mouseover: (e) => {
                  const feature = indonesianData.features[prov.originalIndex];
                  setActiveProv(feature);
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  setActiveProv(null);
                  e.target.closePopup();
                },
              }}
            >
              <Popup className="my-custom-popup" closeButton={false}>
                {isActive && <AnimatedText text={prov.name} />}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Cloud />
      <SearchProvince onProvinceSelect={handleSearchSelect} />

      {selectedProvince && <DetailProvince province={selectedProvince} />}
    </main>
  );
};

export default MapComponent;
