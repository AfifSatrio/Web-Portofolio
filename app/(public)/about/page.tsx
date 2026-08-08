import { AboutSection } from "@/components/sections/AboutSection";
import { RandomFactsSection } from "@/components/sections/RandomFactsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { AnotherSkillsSection } from "@/components/sections/AnotherSkillsSection";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28 pb-12 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <AboutSection />

      {/* Shadow Divider */}
      <div className="relative w-full my-4 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-container mx-6 md:mx-16 h-[1px] bg-gradient-to-r from-transparent via-mono-700/60 to-transparent shadow-[0_8px_24px_rgba(255,255,255,0.2)]" />
      </div>

      <RandomFactsSection />

      {/* Shadow Divider */}
      <div className="relative w-full my-4 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-container mx-6 md:mx-16 h-[1px] bg-gradient-to-r from-transparent via-mono-700/60 to-transparent shadow-[0_8px_24px_rgba(255,255,255,0.2)]" />
      </div>

      <SkillsSection />
      <ToolsSection />
      <AnotherSkillsSection />
    </div>
  );
}

