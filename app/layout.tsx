import React from "react";
import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import { Providers } from "@/components/global/provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "ADSC - Empowering Student Developers at Atmiya University",
  description: `Welcome to ADSC! We are a community of passionate student developers at Atmiya University, dedicated to fostering innovation, collaboration, and growth. Through events, workshops, and guidance, we aim to empower students with technical skills and real-world knowledge.`,
  creator: "Atmiya Developer Student  Club",
  applicationName: "Atmiya Developer Student  Club",
  keywords: ["ADSC", "Atmiya Developer Student Club", "Student Developer Community", "Software Development", "Tech Workshops", "Developer Guidance", "Atmiya University", "Programming Events"],
  metadataBase: new URL("https://adsc-atmiya.in"),
  icons: {
    icon: "./favicon.ico",
    apple: "/ADSC-Icons/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/ADSC-Icons/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/ADSC-Icons/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://adsc-atmiya.vercel.app/",
    title: "ADSC - Empowering Student Developers at Atmiya University",
    description: `Join ADSC, Atmiya University's premier student developer club, where innovation meets collaboration. Discover a community built to support aspiring developers through events, mentorship, and cutting-edge technologies.`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 628,
        alt: "ADSC - Atmiya Developer Student Club",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${silkscreen.variable} relative`}>
        <Providers>
          <main>
            <NavBar />
            {children}
          </main>
          <Footer />
          <div className="absolute inset-0 pointer-events-none main-mask -z-50" />
        </Providers>
      </body>
    </html>
  );
}
