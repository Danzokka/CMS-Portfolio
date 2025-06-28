import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "../context/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafael Dantas Portfolio",
  description: "My personal portfolio showcasing my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen max-w-screen w-full h-full flex flex-col justify-between bg-background px-8`}
          >
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
