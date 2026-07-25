"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { FileDown, CheckCircle2 } from "lucide-react";
import { DUMMY_ABOUT } from "@/lib/dummy-data";

export const AboutSection = () => {
  const valuePropositions = [
    {
      title: "Clean Code & Component Architecture",
      desc: "Menulis kode TypeScript & React yang terstruktur, maintainable, dan siap untuk skala besar.",
    },
    {
      title: "Pixel-Perfect UI & Aesthetic Eye",
      desc: "Mengimplementasikan sistem desain monokrom dengan hierarki tipografi dan whitespace yang presisi.",
    },
    {
      title: "Performance & Responsive Optimization",
      desc: "Memastikan waktu muat web cepat (< 3s) dan tampilan responsif sempurna di seluruh perangkat.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 border-b border-mono-700 bg-black text-white"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Header */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
            // ABOUT ME
          </span>
          <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            TENTANG SAYA
          </h2>
          <p className="text-mono-500 font-sans text-base md:text-lg leading-relaxed">
            {DUMMY_ABOUT.bio}
          </p>

          {DUMMY_ABOUT.cv_url && (
            <div className="pt-2">
              <a href={DUMMY_ABOUT.cv_url} download target="_blank" rel="noreferrer">
                <Button variant="outline" size="md" className="gap-2">
                  <FileDown className="w-4 h-4" />
                  <span>Download CV (PDF)</span>
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Right Value Proposition Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
            // VALUE PROPOSITION FOR RECRUITERS
          </span>

          <div className="flex flex-col gap-4">
            {valuePropositions.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-mono-900 border border-mono-700 rounded-[6px] hover:border-white transition-colors duration-200 flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-archivo text-xl font-bold uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-mono-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
