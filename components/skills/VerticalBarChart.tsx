"use client";

import React, { useEffect, useRef, useState } from "react";

export interface SkillItemData {
  id: string;
  name: string;
  score: number; // 0 - 100
}

interface VerticalBarChartProps {
  skills: SkillItemData[];
}

const Y_AXIS_TIERS = [
  { label: "GOAT", value: 100 },
  { label: "Superb", value: 80 },
  { label: "Average", value: 60 },
  { label: "Newbie", value: 40 },
  { label: "Amateur", value: 20 },
];

export const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ skills }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={chartRef} className="w-full flex flex-col gap-6">
      {/* Chart Canvas Area */}
      <div className="relative flex w-full h-[280px] sm:h-[340px]">
        {/* Y-Axis Tier Labels (Left) */}
        <div className="flex flex-col justify-between h-full pr-4 sm:pr-6 border-r border-mono-800 shrink-0 text-right select-none">
          {Y_AXIS_TIERS.map((tier) => (
            <span
              key={tier.label}
              className="text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-mono-400 leading-none"
            >
              {tier.label}
            </span>
          ))}
        </div>

        {/* Chart Area with Vertical Bars */}
        <div className="relative flex-1 h-full flex items-end justify-around px-4 sm:px-8">
          {skills.map((item, index) => (
            <div
              key={item.id}
              className="relative z-10 flex flex-col items-center justify-end h-full w-12 sm:w-16 md:w-20 group cursor-pointer"
            >
              {/* Solid Non-Transparent Opaque Bar Fill with Scroll Height Animation */}
              <div className="relative w-full h-full flex items-end">
                <div
                  className="relative w-full bg-gradient-to-t from-[#3A3A3A] via-[#888888] to-[#FFFFFF] rounded-t-[6px] shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-1000 ease-out group-hover:brightness-125 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                  style={{
                    height: isVisible ? `${item.score}%` : "0%",
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  {/* Tooltip on Hover positioned right above the top edge of this bar */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap">
                    <div className="px-2 py-0.5 bg-white text-black text-xs font-mono font-bold rounded shadow-lg relative">
                      {item.score}%
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis Skills Labels (Bottom) */}
      <div className="flex w-full pl-[65px] sm:pl-[85px] justify-around text-center pt-4 border-t border-mono-800">
        {skills.map((item) => (
          <div key={`x-${item.id}`} className="w-12 sm:w-16 md:w-20">
            <span className="font-sans text-xs sm:text-sm font-medium uppercase tracking-wider text-mono-300 block">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
