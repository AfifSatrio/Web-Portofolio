import React from "react";
import { Icon } from "@iconify/react";

export interface AnotherSkillItem {
  id: string;
  name: string;
  score: number;
  icon: string;
}

interface AnotherSkillBarProps {
  skill: AnotherSkillItem;
}

export function getSkillTier(score: number): { label: string; badgeClass: string } {
  if (score <= 20) return { label: "Amateur", badgeClass: "border-mono-700 text-mono-500 bg-mono-900" };
  if (score <= 40) return { label: "Newbie", badgeClass: "border-mono-700 text-mono-400 bg-mono-900" };
  if (score <= 60) return { label: "Average", badgeClass: "border-mono-600 text-mono-300 bg-mono-900" };
  if (score <= 80) return { label: "Superb", badgeClass: "border-mono-400 text-white bg-mono-900 font-semibold" };
  return { label: "GOAT", badgeClass: "border-white bg-white text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" };
}

export const AnotherSkillBar: React.FC<AnotherSkillBarProps> = ({ skill }) => {
  const tier = getSkillTier(skill.score);

  return (
    <div className="flex flex-col gap-2.5 p-4 sm:p-5 rounded-[10px] bg-mono-900/90 border border-mono-700 hover:border-white transition-all duration-300 group shadow-md">
      {/* Skill Label & Info Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[6px] bg-black border border-mono-700 group-hover:border-white transition-colors">
            <Icon icon={skill.icon} className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-archivo text-base sm:text-lg font-bold uppercase tracking-tight text-white">
            {skill.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border ${tier.badgeClass}`}>
            {tier.label}
          </span>
          <span className="font-mono text-sm font-bold text-mono-300 min-w-[36px] text-right">
            {skill.score}%
          </span>
        </div>
      </div>

      {/* Bar Chart Track */}
      <div className="relative w-full h-3 bg-black rounded-full overflow-hidden border border-mono-800 p-0.5">
        {/* Animated Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-mono-700 via-mono-300 to-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          style={{ width: `${skill.score}%` }}
        />
      </div>
    </div>
  );
};
