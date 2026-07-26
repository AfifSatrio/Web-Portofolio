import React from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/Badge";
import { SkillCategoryData } from "./SkillDonutChart";

interface SkillCategoryCardProps {
  category: SkillCategoryData;
  isActive: boolean;
  onHover: (id: string | null) => void;
}

export const SkillCategoryCard = ({
  category,
  isActive,
  onHover,
}: SkillCategoryCardProps) => {
  const IconComp = category.icon;

  return (
    <div
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className={`p-6 rounded-[8px] border bg-mono-900 transition-all duration-300 cursor-pointer ${
        isActive
          ? "border-white bg-mono-900 shadow-2xl scale-[1.02]"
          : "border-mono-700 hover:border-mono-500"
      }`}
    >
      <div className="flex items-center justify-between border-b border-mono-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          {typeof IconComp === "string" ? (
            <Icon icon={IconComp} className="w-5 h-5 text-white" />
          ) : (
            <IconComp className="w-5 h-5 text-white" />
          )}
          <h3 className="font-archivo text-xl font-bold uppercase text-white tracking-wide">
            {category.name}
          </h3>
        </div>
        <span className="font-mono text-sm font-bold text-white px-2.5 py-1 rounded bg-black border border-mono-700">
          {category.percentage}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((item, idx) => (
          <Badge
            key={idx}
            className="px-3.5 py-1.5 text-xs font-sans font-medium bg-black border-mono-700 text-mono-300 hover:border-white hover:text-white transition-colors"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};
