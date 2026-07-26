"use client";

import React, { useState } from "react";
import { SkillDonutChart, SkillCategoryData } from "@/components/skills/SkillDonutChart";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";

const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    id: "frontend",
    name: "Frontend",
    percentage: 50,
    color: "#FFFFFF",
    accentColor: "border-white text-white bg-mono-900",
    glowColor: "rgba(255, 255, 255, 0.25)",
    icon: "ph:code-bold",
    items: [
      "Frontend Development",
      "Nextjs Supermacy",
      "TailwindCSS",
      "Javascript",
      "Implement wireframe",
    ],
    startAngle: -90,
    endAngle: 81,
    midAngle: -4.5,
  },
  {
    id: "uiux",
    name: "UI/UX",
    percentage: 35,
    color: "#A3A3A3",
    accentColor: "border-mono-500 text-mono-300 bg-mono-900",
    glowColor: "rgba(163, 163, 163, 0.25)",
    icon: "ph:layout-bold",
    items: ["UI Design", "UX design", "Design System"],
    startAngle: 87,
    endAngle: 206.7,
    midAngle: 146.85,
  },
  {
    id: "backend",
    name: "Backend",
    percentage: 15,
    color: "#525252",
    accentColor: "border-mono-700 text-mono-400 bg-mono-900",
    glowColor: "rgba(82, 82, 82, 0.25)",
    icon: "ph:database-bold",
    items: ["Make a nice database"],
    startAngle: 212.7,
    endAngle: 264,
    midAngle: 238.35,
  },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-16 items-center">
        {/* Section Header */}
        <div className="flex flex-col gap-3 items-center text-center">
          <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
            {"// TECHNICAL CAPABILITIES"}
          </span>
          <h2 className="font-archivo text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            SKILL &amp; TECH STACK
          </h2>
        </div>

        {/* Main Content Grid: Interactive Donut Diagram & Pointer Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <SkillDonutChart
            categories={SKILL_CATEGORIES}
            activeCategory={activeCategory}
            onHoverCategory={setActiveCategory}
          />

          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillCategoryCard
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onHover={setActiveCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
