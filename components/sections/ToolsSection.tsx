"use client";

import React from "react";
import { ToolCard, ToolItem } from "@/components/tools/ToolCard";

const TOOLS_LIST: ToolItem[] = [
  { id: "figma", name: "Figma", type: "figma" },
  { id: "antigravity", name: "Antigravity", type: "antigravity" },
  { id: "prisma", name: "Prisma ORM", type: "prisma" },
  { id: "supabase", name: "Supabase", type: "supabase" },
  { id: "laravel", name: "Laravel", type: "laravel" },
  { id: "firebase", name: "Firebase Auth", type: "firebase" },
  { id: "postman", name: "Postman", type: "postman" },
  { id: "chrome", name: "Google Chrome", type: "chrome" },
  { id: "github", name: "GitHub", type: "github" },
  { id: "vercel", name: "Vercel", type: "vercel" },
];

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ToolsSection = () => {
  return (
    <section
      id="tools"
      className="py-16 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-10 items-center">
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              {"// TOOLS & ENVIRONMENT"}
            </span>
            <h3 className="font-archivo text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              MY TOOLS
            </h3>
          </div>
        </ScrollReveal>

        {/* Tools Icon Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-4 sm:gap-6 w-full max-w-5xl justify-center">
          {TOOLS_LIST.map((tool, idx) => (
            <ScrollReveal key={tool.id} variant="zoom-in" delay={idx * 45}>
              <ToolCard tool={tool} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
