import { Calendar, Music, PlayCircle } from "lucide-react";

import React from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

export default function DetailInfoProvinceCard({ data, label }) {
  const displayName = data.name || data.title;
  const embedUrl = data.video_url ? getYouTubeEmbedUrl(data.video_url) : null;
  const hasVisualMedia = !!(data.image_url || embedUrl);

  return (
    <div
      className={`flex flex-col gap-4 ${
        hasVisualMedia ? "md:flex-row md:gap-8" : ""
      }`}
    >
      {/* A. VISUAL SECTION (Image/Video Only) */}
      {hasVisualMedia && (
        <div className="w-full md:w-1/2 mx-auto shrink-0">
          <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative bg-black shadow-lg">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={displayName}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={data.image_url}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt={displayName}
              />
            )}
          </div>
        </div>
      )}

      {/* B. CONTENT SECTION */}
      <div
        className={`space-y-4 flex flex-col ${
          hasVisualMedia ? "md:w-1/2" : "w-full"
        }`}
      >
        {/* Header Title */}
        <div
          className={`
            bg-linear-to-r from-(--color-secondary)/30 to-transparent px-4 py-2 border-l-4 border-(--color-secondary)
            ${!hasVisualMedia ? "text-left" : ""} 
        `}
        >
          <h3 className="text-[#f2ecd5] text-2xl md:text-4xl serif mb-1 font-bold">
            {displayName} {/* Pake variabel baru yg udah dinormalisasi */}
          </h3>
          <span className="uppercase text-xs tracking-widest text-white/60 font-semibold">
            {label}
          </span>
        </div>

        {/* --- SLOT KHUSUS --- */}

        {/* 1. AUDIO PLAYER (Kasus Lagu Daerah) 🎵 */}
        {data.audio_url && <CustomAudioPlayer audioUrl={data.audio_url} />}

        {/* 2. DATE & CARA MAIN (Badge Info) */}
        <div
          className={`flex flex-wrap gap-2 ${
            !hasVisualMedia ? "justify-center md:justify-start" : ""
          }`}
        >
          {data.event_date && (
            <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 p-2 rounded-md w-fit">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{data.event_date}</span>
            </div>
          )}

          {data.cara_main && (
            <div className="flex items-center gap-2 text-blue-300 bg-blue-400/10 p-2 rounded-md w-fit">
              <Music className="w-4 h-4" />
              <span className="text-sm font-medium">{data.cara_main}</span>
            </div>
          )}
        </div>

        {/* 3. DESCRIPTION / LYRICS */}
        {/* Fallback: Kalau ada description pake itu, kalau gada cek lyrics */}
        {data.description && (
          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <p className="text-[#c7c7c7] text-sm md:text-base leading-relaxed text-justify whitespace-pre-line">
              {data.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
