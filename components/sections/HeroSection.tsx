"use client";
import { useEffect, useState } from "react";
import { PROFILE_ABOUT } from "@/lib/profile-content";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { HeroActions } from "@/components/hero/HeroActions";
import { HeroSocials } from "@/components/hero/HeroSocials";

export function HeroSection() {
  const [tagline, setTagline] = useState(PROFILE_ABOUT.tagline);
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const content = await fetchPortfolioContent();
      if (active && content) setTagline(content.about.tagline);
    };
    refresh();
    const unsubscribe = subscribeToContentRefresh(refresh);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);
  return (
    <section className="relative min-h-[85svh] pt-36 pb-20 flex items-center overflow-hidden border-b border-line-subtle">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_55%_65%_at_50%_50%,#000_10%,transparent_100%)] opacity-30 pointer-events-none"
      />
      <div className="content-container relative flex flex-col items-center text-center">
        <p className="eyebrow mb-6">Web development for your business</p>
        <h1 className="font-archivo text-[clamp(2.75rem,9vw,7rem)] uppercase tracking-tight leading-none">
          Afif Satrio
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-secondary">
          {tagline}
        </p>
        <p className="mt-4 max-w-xl body-copy">
          I build business websites and custom web applications, from responsive
          interfaces to back-end functionality.
        </p>
        <div className="mt-8">
          <HeroActions />
        </div>
        <div className="mt-8">
          <HeroSocials />
        </div>
      </div>
    </section>
  );
}
