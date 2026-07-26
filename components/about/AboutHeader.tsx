import React from "react";

interface AboutHeaderProps {
  tagline?: string;
  title?: string;
}

export const AboutHeader = ({
  tagline = "// ABOUT ME",
  title = "ABOUT DEVELOPER",
}: AboutHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
        {tagline}
      </span>
      <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
        {title}
      </h2>
    </div>
  );
};
