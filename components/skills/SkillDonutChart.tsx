import React from "react";

export interface SkillCategoryData {
  id: string;
  name: string;
  percentage: number;
  color: string;
  accentColor: string;
  glowColor: string;
  icon: React.ElementType | string;
  items: string[];
  startAngle: number;
  endAngle: number;
  midAngle: number;
}

interface SkillDonutChartProps {
  categories: SkillCategoryData[];
  activeCategory: string | null;
  onHoverCategory: (id: string | null) => void;
}

function getDonutArcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngleDeg: number,
  endAngleDeg: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const startRad = toRad(startAngleDeg);
  const endRad = toRad(endAngleDeg);

  const x1Outer = cx + rOuter * Math.cos(startRad);
  const y1Outer = cy + rOuter * Math.sin(startRad);
  const x2Outer = cx + rOuter * Math.cos(endRad);
  const y2Outer = cy + rOuter * Math.sin(endRad);

  const x1Inner = cx + rInner * Math.cos(endRad);
  const y1Inner = cy + rInner * Math.sin(endRad);
  const x2Inner = cx + rInner * Math.cos(startRad);
  const y2Inner = cy + rInner * Math.sin(startRad);

  const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? 0 : 1;

  return `
    M ${x1Outer} ${y1Outer}
    A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}
    L ${x1Inner} ${y1Inner}
    A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner}
    Z
  `;
}

export const SkillDonutChart = ({
  categories,
  activeCategory,
  onHoverCategory,
}: SkillDonutChartProps) => {
  const cx = 300;
  const cy = 210;
  const rOuter = 110;
  const rInner = 65;

  return (
    <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
      <div className="relative w-full max-w-[600px] aspect-[600/420]">
        <svg
          viewBox="0 0 600 420"
          className="w-full h-full drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {categories.map((cat) => (
              <filter
                key={`filter-${cat.id}`}
                id={`glow-${cat.id}`}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            ))}
          </defs>

          {/* Donut Slices */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const path = getDonutArcPath(
              cx,
              cy,
              isActive ? rOuter + 6 : rOuter,
              rInner,
              cat.startAngle,
              cat.endAngle
            );

            return (
              <g key={cat.id} className="cursor-pointer group">
                <path
                  d={path}
                  fill={cat.color}
                  stroke="#000000"
                  strokeWidth="3"
                  className="transition-all duration-300 ease-out hover:opacity-100"
                  style={{
                    opacity: activeCategory && !isActive ? 0.45 : 1,
                    filter: isActive ? `url(#glow-${cat.id})` : undefined,
                  }}
                  onMouseEnter={() => onHoverCategory(cat.id)}
                  onMouseLeave={() => onHoverCategory(null)}
                />
              </g>
            );
          })}

          {/* Center Badge Text in Donut */}
          <g className="pointer-events-none text-center">
            <circle
              cx={cx}
              cy={cy}
              r={rInner - 8}
              fill="#0A0A0A"
              stroke="#262626"
              strokeWidth="1.5"
            />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              className="text-xs font-mono font-bold uppercase tracking-widest"
            >
              MY SKILLS
            </text>
          </g>

          {/* Pointer Lines & Labels */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const toRad = (deg: number) => (deg * Math.PI) / 180;
            const midRad = toRad(cat.midAngle);
            const isRightSide = Math.cos(midRad) >= 0;

            const xStart = cx + (rOuter + 8) * Math.cos(midRad);
            const yStart = cy + (rOuter + 8) * Math.sin(midRad);
            const xKnee = cx + (isRightSide ? rOuter + 40 : -(rOuter + 40));
            const yKnee = yStart;
            const xEnd = xKnee + (isRightSide ? 30 : -30);
            const yEnd = yKnee;
            const labelX = xEnd + (isRightSide ? 6 : -6);
            const labelY = yEnd + 4;
            const textAnchor: "start" | "end" = isRightSide ? "start" : "end";

            return (
              <g
                key={`pointer-${cat.id}`}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => onHoverCategory(cat.id)}
                onMouseLeave={() => onHoverCategory(null)}
                style={{ opacity: activeCategory && !isActive ? 0.35 : 1 }}
              >
                <circle
                  cx={xStart}
                  cy={yStart}
                  r="3.5"
                  fill={cat.color}
                  stroke="#000000"
                  strokeWidth="1"
                />
                <polyline
                  points={`${xStart},${yStart} ${xKnee},${yKnee} ${xEnd},${yEnd}`}
                  fill="none"
                  stroke={isActive ? "#FFFFFF" : "#525252"}
                  strokeWidth={isActive ? "2" : "1.25"}
                  strokeDasharray={isActive ? "none" : "3 3"}
                  className="transition-all duration-300"
                />
                <circle
                  cx={xEnd}
                  cy={yEnd}
                  r="3.5"
                  fill={isActive ? "#FFFFFF" : cat.color}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  fill={isActive ? "#FFFFFF" : cat.color}
                  fontSize="11"
                  className={`font-archivo font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? "text-sm" : ""
                    }`}
                >
                  {cat.name} ({cat.percentage}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

