"use client";

import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AudioController = ({ onAudioRefsReady }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const backsoundRef = useRef(null);
  const zoomRef = useRef(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    backsoundRef.current = new Audio("/music/backsound.mp3");
    zoomRef.current = new Audio("/music/zoom.mp3");
    hoverRef.current = new Audio("/music/marker-hover.mp3");

    backsoundRef.current.loop = true;
    backsoundRef.current.volume = 0.3;
    zoomRef.current.volume = 1;
    hoverRef.current.volume = 1;

    if (onAudioRefsReady) {
      onAudioRefsReady({
        backsound: backsoundRef.current,
        zoom: zoomRef.current,
        hover: hoverRef.current,
      });
    }

    const playBacksound = async () => {
      try {
        backsoundRef.current.currentTime = 5;
        await backsoundRef.current.play();
        setIsMusicOn(true);
      } catch (err) {
        console.log(
          "Autoplay blocked by browser, waiting for user interaction..."
        );
        setIsMusicOn(false);

        const startAudioOnInteraction = () => {
          if (backsoundRef.current) {
            backsoundRef.current
              .play()
              .then(() => {
                setIsMusicOn(true);
              })
              .catch((e) => console.log("Still failed: ", e));
          }
          document.removeEventListener("click", startAudioOnInteraction);
          document.removeEventListener("keydown", startAudioOnInteraction);
        };

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
        console.log("Failed to play audio: ", err);
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed z-1000 right-3 top-3 md:right-5 md:top-3 bg-[color-mix(in_srgb,var(--color-primary)_90%,transparent)]  backdrop-blur-md  border border-(--color-secondary) p-2.5 md:p-3  rounded-full  hover:bg-(--color-secondary)  active:scale-95 transition-all duration-300  group shadow-lg"
      title={isMusicOn ? "Turn off music" : "Turn on music"}
      aria-label={isMusicOn ? "Turn off music" : "Turn on music"}
    >
      {isMusicOn ? (
        <Volume2 className="w-5 h-5 md:w-6 md:h-6 stroke-white" />
      ) : (
        <VolumeX className="w-5 h-5 md:w-6 md:h-6 stroke-white" />
      )}
    </button>
  );
};

export default AudioController;
