"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { ArrowDownRight, Monitor } from "lucide-react";
import { DUMMY_ABOUT } from "@/lib/dummy-data";

// Dynamic import with SSR disabled for React Three Fiber 3D scene
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/9] max-w-3xl bg-mono-900 border border-mono-700 rounded-[8px] flex flex-col items-center justify-center p-8 gap-3">
      <Monitor className="w-12 h-12 text-mono-500 animate-pulse" />
      <span className="text-xs uppercase font-mono tracking-widest text-mono-500">
        MEMUAT MODEL 3D SCENE...
      </span>
    </div>
  ),
});

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 px-6 md:px-16 flex flex-col justify-center items-center text-center overflow-hidden border-b border-mono-700 bg-black"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-container mx-auto z-10 flex flex-col items-center gap-8">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-mono-700 bg-mono-900/80 rounded-full text-xs font-medium text-mono-300">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>OPEN FOR WORK &amp; OPPORTUNITIES</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="font-archivo text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none max-w-5xl">
          FRONTEND DEVELOPER
        </h1>

        {/* Tagline / Subtitle */}
        <p className="font-sans text-mono-500 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed">
          {DUMMY_ABOUT.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link href="#projects">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              <span>Lihat Proyek</span>
              <ArrowDownRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <span>Hubungi Saya</span>
            </Button>
          </Link>
        </div>

        {/* 3D Computer Scene Component (React Three Fiber) */}
        <div className="w-full max-w-4xl mt-8 flex justify-center">
          <HeroScene />
        </div>
      </div>
    </section>
  );
};
