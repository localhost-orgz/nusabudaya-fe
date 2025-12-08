"use client";

import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AudioController = ({ onAudioRefsReady }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const backsoundRef = useRef(null);
  const zoomRef = useRef(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    // inisiasi elemen buat audio
    backsoundRef.current = new Audio("/music/backsound.mp3");
    zoomRef.current = new Audio("/music/zoom.mp3");
    hoverRef.current = new Audio("/music/marker-hover.mp3");

    // backsound bikin loop
    backsoundRef.current.loop = true;
    backsoundRef.current.volume = 0.3;

    // set zoom dan hover volume
    zoomRef.current.volume = 1;
    hoverRef.current.volume = 1;

    // oper refs ke parent component
    if (onAudioRefsReady) {
      onAudioRefsReady({
        backsound: backsoundRef.current,
        zoom: zoomRef.current,
        hover: hoverRef.current,
      });
    }

    // biar autoplay backsound
    const playBacksound = async () => {
      try {
        backsoundRef.current.currentTime = 5;
        await backsoundRef.current.play();
        setIsMusicOn(true); // Kalo sukses, state jadi true
      } catch (err) {
        console.log("Autoplay ditahan browser, nunggu interaksi user... 😴");
        setIsMusicOn(false); // State off dulu

        // Bikin fungsi buat nyalain lagu pas user klik pertama kali
        const startAudioOnInteraction = () => {
          if (backsoundRef.current) {
            backsoundRef.current
              .play()
              .then(() => {
                setIsMusicOn(true);
              })
              .catch((e) => console.log("Masih gagal: ", e));
          }
          // Penting: Hapus listener biar gak jalan tiap kali user klik
          document.removeEventListener("click", startAudioOnInteraction);
          document.removeEventListener("keydown", startAudioOnInteraction);
        };

        // Pasang listener di seluruh dokumen
        document.addEventListener("click", startAudioOnInteraction);
        document.addEventListener("keydown", startAudioOnInteraction);
      }
    };

    playBacksound();

    return () => {
      if (backsoundRef.current) {
        backsoundRef.current.pause();
        backsoundRef.current = null;
      }
      if (zoomRef.current) {
        zoomRef.current.pause();
        zoomRef.current = null;
      }
      if (hoverRef.current) {
        hoverRef.current.pause();
        hoverRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!backsoundRef.current) return;

    if (isMusicOn) {
      backsoundRef.current.pause();
      setIsMusicOn(false);
    } else {
      try {
        await backsoundRef.current.play();
        setIsMusicOn(true);
      } catch (err) {
        console.log("Gagal memutar lagu: ", err);
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="absolute right-5 md:right-3 top-2.5 md:top-3 z-1000 bg-(--color-primary-90) backdrop-blur-md border border-(--color-secondary) p-3 rounded-full hover:bg-(--color-secondary) transition-all duration-300 group"
      title={isMusicOn ? "Turn off music" : "Turn on music"}
    >
      {isMusicOn ? (
        <Volume2 className="w-6 h-6 stroke-white group-hover:stroke-white" />
      ) : (
        <VolumeX className="w-6 h-6 stroke-white group-hover:stroke-white" />
      )}
    </button>
  );
};

export default AudioController;
