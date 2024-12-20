import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavbarDemo } from "./components/navbar/NavbarDemo";
import React, { Suspense } from "react";
import Loader from "./components/loader/Loader";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EchoRay",
  description: "EchoRay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 text-white`}
      >
        
        <NavbarDemo />
        <Suspense fallback={<Loader />}> {/* Use Suspense with Loader */}

          {children}
        </Suspense>
      </body>
    </html>
  );
}
