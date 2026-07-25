"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Linkedin, Instagram, ExternalLink, Code } from "lucide-react";

export function ComputerModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating animation and scroll-based rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15 + (scrollProgress * 0.5);
    groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.1}>
      {/* --- MONITOR BASE --- */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.15, 32]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* --- MONITOR STAND --- */}
      <mesh position={[0, -1.0, -0.2]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.2]} />
        <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* --- MONITOR FRAME (BODY) --- */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4.2, 2.6, 0.25]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Outer Border Highlight Accent */}
      <mesh position={[0, 0.3, 0.01]}>
        <boxGeometry args={[4.26, 2.66, 0.2]} />
        <meshStandardMaterial color="#333333" wireframe />
      </mesh>

      {/* --- HTML SCREEN OVERLAY --- */}
      <Html
        transform
        occlude
        position={[0, 0.3, 0.13]}
        distanceFactor={2.3}
        className="select-none pointer-events-auto"
      >
        <div className="w-[600px] h-[360px] bg-[#0A0A0A] border-2 border-[#333333] rounded-[8px] p-6 text-white font-sans flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#333333] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#7A7A7A] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#333333] inline-block" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A7A7A]">
              SYSTEM://PORTFOLIO_OS_V1.0
            </span>
          </div>

          {/* Main Content inside 3D Screen */}
          <div className="grid grid-cols-12 gap-6 items-center flex-1 py-4">
            {/* Left Profile Avatar Graphic */}
            <div className="col-span-4 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-white flex items-center justify-center p-1 relative overflow-hidden">
                <Code className="w-10 h-10 text-white" />
              </div>
              <span className="text-[10px] font-mono text-[#7A7A7A] uppercase">@DEVELOPER</span>
            </div>

            {/* Right Details */}
            <div className="col-span-8 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-[#7A7A7A] uppercase tracking-wider">
                // FRONTEND DEVELOPER
              </span>
              <h2 className="font-archivo text-2xl font-black uppercase text-white tracking-tight leading-tight">
                DEV PORTFOLIO
              </h2>
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                Passionate about clean UI, TypeScript, Next.js, and interactive 3D web experiences.
              </p>

              {/* Clickable Social Media Links */}
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] border border-[#333333] rounded-[4px] text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] border border-[#333333] rounded-[4px] text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Status inside 3D Screen */}
          <div className="border-t border-[#333333] pt-2 flex items-center justify-between text-[9px] text-[#7A7A7A] font-mono">
            <span>STATUS: ONLINE</span>
            <span>FPS: 60 | WEBGL READY</span>
          </div>
        </div>
      </Html>
    </group>
  );
}
