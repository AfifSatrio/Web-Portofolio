"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";
import { contactHref, site } from "@/content/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackedSection } from "@/components/ui/StackedSection";

const links = [
  { label: "Email", url: contactHref, handle: site.email },
  ...site.socialLinks,
];

export function ContactSection() {
  const reduced = useReducedMotion();

  return (
    <StackedSection id="contact" className="home-contact" labelledBy="contact-title" index={2} last>
      <ScrollReveal>
        <h2 id="contact-title">{home.contact.title}</h2>
        <p className="contact-intro">{home.contact.introduction}</p>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <ul className="contact-links" aria-label="Contact and social profiles">
          {links.map((link) => {
            const external = !link.url.startsWith("mailto:");
            return (
              <li key={link.label}>
                <motion.a
                  href={link.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  whileHover={reduced ? undefined : { x: 4 }}
                  whileTap={reduced ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>
                    <span className="contact-label">{link.label}</span>
                    <span className="contact-detail">{link.handle}</span>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </motion.a>
              </li>
            );
          })}
        </ul>
      </ScrollReveal>
    </StackedSection>
  );
}
