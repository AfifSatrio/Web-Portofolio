import React from "react";

interface AboutBioProps {
  paragraphs: string[];
}

export const AboutBio = ({ paragraphs }: AboutBioProps) => {
  return (
    <div className="flex flex-col gap-4 text-mono-300 font-sans text-base md:text-lg leading-relaxed max-w-3xl text-center items-center">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};
