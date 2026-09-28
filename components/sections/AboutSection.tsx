"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { home } from "@/content/home";
import { contactHref, site } from "@/content/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackedSection } from "@/components/ui/StackedSection";

const socialIcons = { github: Github, linkedin: Linkedin, instagram: Instagram, email: Mail };
const links = [
  ...site.socialLinks,
  { label: "Email", url: contactHref, icon: "email" as const },
];

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <StackedSection id="about" className="home-hero" labelledBy="hero-title" index={0}>
      <ScrollReveal delay={80}>
        <h1 id="hero-title">
          {home.about.greeting}
          <br />
          <span>{home.about.headline}</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={160} className="hero-bottom">
        <p>{home.about.introduction}</p>
        <a href="#projects" className="round-link">
          {home.about.exploreLabel}
          <span><ArrowDown size={20} aria-hidden="true" /></span>
        </a>
      </ScrollReveal>
      <ScrollReveal delay={220} className="hero-socials">
        <p className="eyebrow">{home.about.socialLabel}</p>
        <ul className="profile-social-links" aria-label="Social profiles and email">
          {links.map(({ label, url, icon }) => {
            const Icon = socialIcons[icon];
            const external = !url.startsWith("mailto:");
            return (
              <li key={label}>
                <motion.a
                  href={url}
                  aria-label={label}
                  title={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  whileHover={reduced ? undefined : { y: -3 }}
                  whileTap={reduced ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                </motion.a>
              </li>
            );
          })}
        </ul>
      </ScrollReveal>
    </StackedSection>
  );
}
