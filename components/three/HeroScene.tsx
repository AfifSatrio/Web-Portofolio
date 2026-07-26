"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Monitor } from "lucide-react";

function SceneContent() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = Math.min(Math.max(-rect.top / windowHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -2, -5]} intensity={0.8} color="#7A7A7A" />
      <pointLight position={[0, 0, 3]} intensity={1.5} color="#ffffff" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-mono-900 border border-mono-700 rounded-[8px] p-8 gap-3">
        <Monitor className="w-12 h-12 text-mono-500 animate-pulse" />
        <span className="text-xs uppercase font-mono tracking-widest text-mono-500">
          MEMUAT HERO 3D SCENE...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-w-4xl relative cursor-grab active:cursor-grabbing">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-mono-900 border border-mono-700 rounded-[8px] p-8 gap-3">
            <Monitor className="w-12 h-12 text-mono-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-mono-500">
              MEMUAT RENDER 3D...
            </span>
          </div>
        }
      >
        <Canvas gl={{ antialias: true, alpha: true }}>
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
