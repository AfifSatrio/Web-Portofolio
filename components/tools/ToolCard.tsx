import React from "react";
import { ToolIcon, ToolType } from "./ToolIcon";

export interface ToolItem {
  id: string;
  name: string;
  type: ToolType;
}

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div
      className="group relative flex items-center justify-center p-5 sm:p-6 rounded-[12px] bg-mono-900 border border-mono-700 hover:border-white transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer hover:-translate-y-1"
    >
      <ToolIcon
        name={tool.type}
        className="w-7 h-7 sm:w-8 sm:h-8 text-mono-400 group-hover:text-white group-hover:scale-110 transition-all duration-300"
      />

      {/* Tooltip on Hover */}
      <div className="absolute -bottom-9 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap">
        <div className="px-3 py-1 bg-white text-black text-[11px] font-sans font-semibold rounded-[4px] shadow-lg relative">
          {tool.name}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
        </div>
      </div>
    </div>
  );
};
