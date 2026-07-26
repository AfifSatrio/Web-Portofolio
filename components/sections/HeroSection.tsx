"use client";

import React, { useEffect, useState } from "react";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { DUMMY_ABOUT } from "@/lib/dummy-data";
import { safeQuery } from "@/lib/supabase";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroActions } from "@/components/hero/HeroActions";
import { HeroSocials } from "@/components/hero/HeroSocials";

export const HeroSection = () => {
  const [tagline, setTagline] = useState<string>(DUMMY_ABOUT.tagline);

  useEffect(() => {
    const loadTagline = () => safeQuery<{ tagline: string }>(
      (client) =>
        client
          .from("about_content")
          .select("tagline")
          .limit(1)
          .single()
    ).then((data) => {
      if (data?.tagline) setTagline(data.tagline);
    });

    loadTagline();
    const unsubscribe = subscribeToContentRefresh(loadTagline);
    const interval = window.setInterval(loadTagline, 5000);

    return () => {
      unsubscribe();
      window.clearInterval(interval);
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
        <HeroHeadline tagline={tagline} />
        <HeroActions />
        <HeroSocials />
      </div>
    </section>
  );
};
