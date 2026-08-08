"use client";

import React from "react";
import Image from "next/image";
import { RANDOM_FACTS } from "@/constants";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const RandomFactsSection = () => {
  // Split facts into left and right columns
  const mid = Math.ceil(RANDOM_FACTS.length / 2);
  const leftFacts = RANDOM_FACTS.slice(0, mid);
  const rightFacts = RANDOM_FACTS.slice(mid);

  return (
    <section
      id="random-facts"
      className="py-20 px-6 md:px-16 bg-black text-white relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              {"// GET TO KNOW ME"}
            </span>
            <h2 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              RANDOM FACTS
            </h2>
          </div>
        </ScrollReveal>

        {/* === Mobile Layout (Mobile First) === */}
        <div className="flex flex-col items-center gap-10 md:hidden">
          {/* Circular Profile Photo Container */}
          <ScrollReveal variant="zoom-in">
            <div className="relative w-56 h-56 rounded-full border-2 border-mono-500 overflow-hidden shadow-[0_0_35px_rgba(255,255,255,0.15)] bg-mono-900 shrink-0">
              <Image
                src="/profile.jpg"
                alt="Afif Satrio"
                fill
                sizes="224px"
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Facts list with pointer dots and single-line note text */}
          <div className="w-full flex flex-col gap-3.5 max-w-md px-2">
            {RANDOM_FACTS.map((fact, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={index * 60}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-mono-300" />
                    <div className="w-4 h-[1px] bg-mono-700" />
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-white font-sans text-sm font-semibold">
                      {fact.text}
                    </span>
                    {fact.note && (
                      <span className="text-mono-400 font-sans text-xs italic font-normal">
                        ({fact.note})
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* === Desktop Layout === */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Left Column — Facts with pointer lines pointing RIGHT to center */}
          <div className="col-span-4 flex flex-col gap-6 items-end">
            {leftFacts.map((fact, index) => (
              <ScrollReveal key={`left-${index}`} variant="fade-right" delay={index * 80}>
                <div className="flex items-center gap-3 justify-end group cursor-default">
                  <div className="flex items-baseline gap-1.5 text-right">
                    <span className="text-white font-sans text-sm lg:text-base font-semibold md:group-hover:text-mono-200 transition-colors">
                      {fact.text}
                    </span>
                    {fact.note && (
                      <span className="text-mono-400 font-sans text-xs italic font-normal">
                        ({fact.note})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center shrink-0">
                    <div className="w-6 lg:w-12 h-[1px] bg-gradient-to-r from-mono-700 to-mono-400 md:group-hover:from-white md:group-hover:to-white transition-colors duration-300" />
                    <div className="w-2 h-2 rounded-full bg-mono-400 md:group-hover:bg-white md:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Center — Circular Profile Photo */}
          <div className="col-span-4 flex justify-center">
            <ScrollReveal variant="zoom-in" delay={150}>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-mono-500 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.15)] bg-mono-900 shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Afif Satrio"
                  fill
                  sizes="(max-width: 1024px) 288px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — Facts with pointer lines pointing LEFT to center */}
          <div className="col-span-4 flex flex-col gap-6 items-start">
            {rightFacts.map((fact, index) => (
              <ScrollReveal key={`right-${index}`} variant="fade-left" delay={index * 80}>
                <div className="flex items-center gap-3 justify-start group cursor-default">
                  <div className="flex items-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-mono-400 md:group-hover:bg-white md:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
                    <div className="w-6 lg:w-12 h-[1px] bg-gradient-to-l from-mono-700 to-mono-400 md:group-hover:from-white md:group-hover:to-white transition-colors duration-300" />
                  </div>

                  <div className="flex items-baseline gap-1.5 text-left">
                    <span className="text-white font-sans text-sm lg:text-base font-semibold md:group-hover:text-mono-200 transition-colors">
                      {fact.text}
                    </span>
                    {fact.note && (
                      <span className="text-mono-400 font-sans text-xs italic font-normal">
                        ({fact.note})
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
