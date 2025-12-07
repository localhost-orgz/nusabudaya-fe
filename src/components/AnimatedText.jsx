import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all"; // Pastikan path import bener

gsap.registerPlugin(SplitText);

const AnimatedText = ({ text }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Target elemen containerRef.current (DOM asli)
      // 2. SplitText akan otomatis kosongin div dan isi dengan span-span baru
      const split = new SplitText(containerRef.current, { type: "chars" });

      // 3. Animate hasil split-nya (split.chars)
      gsap.from(split.chars, {
        y: 5,
        opacity: 0,
        duration: 0.4,
        stagger: 0.015,
        ease: "expo.out",
      });

      // 🧹 Cleanup (Penting di React Strict Mode biar teks ga numpuk)
      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [text] } // Re-run kalo teks berubah
  );

  return (
    <div
      ref={containerRef}
      className="font-bold text-center text-sm overflow-hidden"
    >
      {text}
    </div>
  );
};

export default AnimatedText;
