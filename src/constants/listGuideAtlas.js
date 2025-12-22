// src/constants/guideData.js
import {
  ZoomIn,
  MapPin,
  MousePointerClick,
  Music,
  Maximize2,
  Hand,
} from "lucide-react";

export const DESKTOP_GUIDES = [
  {
    icon: <ZoomIn className="w-5 h-5 text-sky-400" />,
    text: "Scroll mouse untuk zoom in & zoom out peta.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-emerald-400" />,
    text: "Arahkan kursor ke marker untuk lihat batasan provinsi.",
  },
  {
    icon: <MousePointerClick className="w-5 h-5 text-yellow-400" />,
    text: "Klik marker untuk melihat detail lengkap provinsi.",
  },
  {
    icon: <Music className="w-5 h-5 text-pink-400" />,
    text: "Tekan tombol 'M' di keyboard untuk atur musik.",
  },
];

export const MOBILE_GUIDES = [
  {
    icon: <Maximize2 className="w-5 h-5 text-sky-400" />,
    text: "Cubit layar (pinch) untuk zoom in & zoom out.",
  },
  {
    icon: <Hand className="w-5 h-5 text-emerald-400" />,
    text: "Tap sekali pada marker untuk lihat batasan provinsi.",
  },
  {
    icon: <MousePointerClick className="w-5 h-5 text-yellow-400" />,
    text: "Double tap marker untuk melihat detail provinsi.",
  },
];
