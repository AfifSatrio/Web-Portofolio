import React from "react";

export const SkillLevelAxis = () => {
  const tiers = [
    { name: "Amateur", range: "0-20%" },
    { name: "Newbie", range: "21-40%" },
    { name: "Average", range: "41-60%" },
    { name: "Superb", range: "61-80%" },
    { name: "GOAT", range: "81-100%" },
  ];

  return (
    <div className="w-full hidden sm:flex flex-col gap-2 pb-4 border-b border-mono-800">
      {/* Tier labels across scale */}
      <div className="grid grid-cols-5 text-center">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-archivo font-bold uppercase tracking-wider text-mono-300">
              {tier.name}
            </span>
            <span className="text-[10px] font-mono text-mono-500">
              {tier.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
