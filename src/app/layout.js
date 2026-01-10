import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: 'NusaBudaya - Platform Eksplorasi Budaya Berbasis AI & Peta Interaktif',
  description: 'Jelajahi kekayaan Nusantara dengan NusaBudaya. Fitur NusaLens berbasis Artificial Intelligence membantu Anda mengenali objek budaya secara instan, dilengkapi peta interaktif dan gamifikasi edukatif.',
  keywords: ['Budaya Indonesia', 'Nusantara', 'AI Culture Detector', 'Peta Budaya', 'Edukasi Sejarah', 'NusaLens'],
  manifest: "/manifest.json"
};

export const viewport = {
  themeColor: "#0D1922",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
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
