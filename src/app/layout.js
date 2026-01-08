"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import Providers from "./providers";
import { useGameResultStore } from "@/stores/gameResultStore";
import { useEffect } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'NusaBudaya - Platform Eksplorasi Budaya Berbasis AI & Peta Interaktif',
//   description: 'Jelajahi kekayaan Nusantara dengan NusaBudaya. Fitur NusaLens berbasis Artificial Intelligence membantu Anda mengenali objek budaya secara instan, dilengkapi peta interaktif dan gamifikasi edukatif.',
//   keywords: ['Budaya Indonesia', 'Nusantara', 'AI Culture Detector', 'Peta Budaya', 'Edukasi Sejarah', 'NusaLens'],
// };

export default function RootLayout({ children }) {
  const fetchGameResult = useGameResultStore((s) => s.fetch);

  useEffect(() => {
    fetchGameResult();
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
