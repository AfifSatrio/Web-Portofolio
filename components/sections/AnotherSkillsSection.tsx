"use client";

import React from "react";
import { VerticalBarChart, SkillItemData } from "@/components/skills/VerticalBarChart";

const ANOTHER_SKILLS_DATA: SkillItemData[] = [
  { id: "uiux", name: "Photography", score: 70 },
  { id: "coding", name: "Coding", score: 65 },
  { id: "cooking", name: "Cooking", score: 50 },
  { id: "coffee", name: "Drinking Coffee", score: 85 },
  { id: "gaming", name: "Gaming", score: 90 },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const AnotherSkillsSection = () => {
  return (
    <section
      id="another-skills"
      className="py-20 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-10 items-center">
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              {"// PERSONAL ABILITIES"}
            </span>
            <h2 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              MY SKILLS
            </h2>
          </div>
        </ScrollReveal>

        {/* Vertical Bar Chart Container */}
        <ScrollReveal variant="fade-up" delay={150} className="w-full max-w-4xl">
          <VerticalBarChart skills={ANOTHER_SKILLS_DATA} />
        </ScrollReveal>
      </div>
    </section>
  );
};
