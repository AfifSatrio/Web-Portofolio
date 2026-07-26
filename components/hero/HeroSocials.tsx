import React from "react";

export interface SocialLink {
  label: string;
  url: string;
}

interface HeroSocialsProps {
  links?: SocialLink[];
}

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: "GITHUB", url: "https://github.com/afifsatrio" },
  { label: "LINKEDIN", url: "https://www.linkedin.com/in/afifsatrio/" },
  { label: "INSTAGRAM", url: "https://instagram.com/afifsatrio_" },
];

export const HeroSocials = ({ links = DEFAULT_SOCIALS }: HeroSocialsProps) => {
  return (
    <div className="pointer-events-auto flex flex-col items-center gap-2 mt-3">
      <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-mono-500">
        Get In Touch
      </span>
      <div className="flex items-center gap-4 text-mono-500 text-xs font-mono uppercase tracking-widest">
        {links.map((link, idx) => (
          <React.Fragment key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
            {idx < links.length - 1 && <span className="text-mono-700">{"//"}</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
