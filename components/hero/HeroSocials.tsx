import React from "react";

export interface SocialLink {
  label: string;
  url: string;
}

interface HeroSocialsProps {
  links?: SocialLink[];
}

import { SOCIAL_LINKS as DEFAULT_SOCIALS } from "@/constants";

export const HeroSocials = ({ links = DEFAULT_SOCIALS }: HeroSocialsProps) => {
  return (
    <div className="pointer-events-auto flex flex-col items-center gap-2 mt-3">
      <span className="text-xs font-sans uppercase tracking-[0.16em] text-mono-500">
        Get In Touch
      </span>
      <div className="flex items-center flex-wrap justify-center gap-3 text-ink-secondary text-xs font-sans uppercase tracking-wider">
        {links.map((link, idx) => (
          <React.Fragment key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center hover:text-white transition-colors"
            >
              {link.label}
            </a>
            {idx < links.length - 1 && (
              <span className="text-mono-700">{"//"}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
