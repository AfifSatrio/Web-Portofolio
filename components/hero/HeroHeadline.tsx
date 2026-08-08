import React from "react";

interface HeroHeadlineProps {
  title?: string;
  tagline: string;
}

export const HeroHeadline = ({
  title = "AFIF SATRIO",
  tagline,
}: HeroHeadlineProps) => {
  return (
    <>
      <h1 className="font-archivo text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none max-w-5xl text-center">
        {title}
      </h1>
      <p className="font-sans text-mono-500 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal leading-relaxed text-center">
        {tagline}
      </p>
    </>
  );
};
