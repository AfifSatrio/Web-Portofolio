"use client";

import React, { useEffect, useMemo, useState } from "react";
import { SkillDonutChart, SkillCategoryData } from "@/components/skills/SkillDonutChart";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { Skill } from "@/types";

import { DISPLAY_CATEGORIES, CATEGORY_STYLES, FALLBACK_CATEGORY_STYLES, CATEGORY_PERCENTAGES } from "@/constants";

const buildSkillCategories = (skills: Skill[]): SkillCategoryData[] => {
  const groupedSkills = skills
    .filter((skill) => skill.category !== "Soft Skills")
    .reduce<Record<string, string[]>>((acc, skill) => {
      const catKey = (skill.category === "Tools" || skill.category === "UI/UX") ? "UI/UX" : skill.category;
      if (!acc[catKey]) acc[catKey] = [];
      acc[catKey].push(skill.name);
      return acc;
    }, {});

  let currentAngle = -90;

  return DISPLAY_CATEGORIES.map((categoryName, index) => {
    const items = groupedSkills[categoryName] || [];
    const style = CATEGORY_STYLES[categoryName] || FALLBACK_CATEGORY_STYLES[index % FALLBACK_CATEGORY_STYLES.length];
    const percentage = CATEGORY_PERCENTAGES[categoryName] ?? 25;
    const angleSize = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSize;
    currentAngle = endAngle;

    return {
      ...style,
      name: categoryName,
      items,
      percentage,
      startAngle,
      endAngle,
      midAngle: startAngle + angleSize / 2,
    };
  });
};

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const skillCategories = useMemo(() => buildSkillCategories(skills), [skills]);

  useEffect(() => {
    const loadSkills = () => fetchPortfolioContent().then((data) => {
      if (data?.skills && data.skills.length > 0) setSkills(data.skills);
    });

    loadSkills();
    const unsubscribe = subscribeToContentRefresh(loadSkills);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-16 items-center">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              {"// TECHNICAL CAPABILITIES"}
            </span>
            <h2 className="font-archivo text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              CODING SKILLS
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Content Grid: Interactive Donut Diagram & Pointer Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal variant="zoom-in" delay={150} className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
            <SkillDonutChart
              categories={skillCategories}
              activeCategory={activeCategory}
              onHoverCategory={setActiveCategory}
            />
          </ScrollReveal>

          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {skillCategories.map((cat, idx) => (
              <ScrollReveal key={cat.id} variant="fade-left" delay={200 + idx * 100}>
                <SkillCategoryCard
                  category={cat}
                  isActive={activeCategory === cat.id}
                  onHover={setActiveCategory}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
