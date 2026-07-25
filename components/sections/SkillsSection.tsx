"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { DUMMY_SKILLS } from "@/lib/dummy-data";

export const SkillsSection = () => {
  // Group skills by category
  const categories = Array.from(new Set(DUMMY_SKILLS.map((s) => s.category)));

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-16 border-b border-mono-700 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
            // TECHNICAL CAPABILITIES
          </span>
          <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            KEAHLIAN &amp; STACK
          </h2>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categorySkills = DUMMY_SKILLS.filter((s) => s.category === category);
            return (
              <div
                key={category}
                className="p-6 md:p-8 bg-mono-900 border border-mono-700 rounded-[6px] flex flex-col gap-6 hover:border-white transition-colors duration-200"
              >
                <div className="flex items-center justify-between border-b border-mono-700 pb-4">
                  <h3 className="font-archivo text-xl font-bold uppercase tracking-wider text-white">
                    {category}
                  </h3>
                  <span className="font-sans text-xs text-mono-500 font-medium">
                    0{categorySkills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      className="px-3.5 py-1.5 text-xs font-sans font-medium tracking-wide bg-black border-mono-700 text-mono-300 hover:border-white hover:text-white"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
