import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: 'NusaBudaya - Platform Eksplorasi Budaya Berbasis AI & Peta Interaktif',
  description: 'Jelajahi kekayaan Nusantara dengan NusaBudaya. Fitur NusaLens berbasis Artificial Intelligence membantu Anda mengenali objek budaya secara instan, dilengkapi peta interaktif dan gamifikasi edukatif.',
  keywords: ['Budaya Indonesia', 'Nusantara', 'AI Culture Detector', 'Peta Budaya', 'Edukasi Sejarah', 'NusaLens'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
