"use client";

// import MapComponent from "@/components/MapComponent";
// import Map from "@/components/map";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map/MapComponent"), {
  ssr: false,
});

export default function Page() {
  return <MapComponent />;
}
