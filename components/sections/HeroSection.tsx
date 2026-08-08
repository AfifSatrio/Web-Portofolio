"use client";

import React, { useEffect, useState } from "react";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { EMPTY_ABOUT } from "@/lib/content-data";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroActions } from "@/components/hero/HeroActions";
import { HeroSocials } from "@/components/hero/HeroSocials";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const HeroSection = () => {
  const [tagline, setTagline] = useState<string>(EMPTY_ABOUT.tagline);

  useEffect(() => {
    const loadTagline = () => fetchPortfolioContent().then((data) => {
      if (data?.about.tagline) setTagline(data.about.tagline);
    });

    loadTagline();
    const unsubscribe = subscribeToContentRefresh(loadTagline);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen pt-20 pb-12 px-6 md:px-16 flex flex-col justify-center items-center text-center overflow-hidden border-b border-mono-700 bg-black group"
    >
      <InteractiveBackground />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      <div className="max-w-container mx-auto z-10 flex flex-col items-center gap-8 relative pointer-events-none">
        <ScrollReveal variant="fade-up" delay={100} className="flex flex-col items-center gap-4">
          <HeroHeadline tagline={tagline} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={250}>
          <HeroActions />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={400}>
          <HeroSocials />
        </ScrollReveal>
      </div>
    </section>
  );
};
