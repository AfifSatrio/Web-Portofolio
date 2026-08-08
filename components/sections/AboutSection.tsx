"use client";

import React, { useEffect, useState } from "react";
import { EMPTY_ABOUT } from "@/lib/content-data";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { AboutContent } from "@/types";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutProfileImage } from "@/components/about/AboutProfileImage";
import { AboutBio } from "@/components/about/AboutBio";
import { AboutGallery, GalleryImage } from "@/components/about/AboutGallery";

const getBioParagraphs = (bio: unknown) => {
  const normalizedBio = typeof bio === "string" && bio.trim().length > 0
    ? bio
    : EMPTY_ABOUT.bio;

  return normalizedBio
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

import { GALLERY_IMAGES as galleryImages } from "@/constants";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const AboutSection = () => {
  const [aboutData, setAboutData] = useState<AboutContent>(EMPTY_ABOUT);

  useEffect(() => {
    const loadAbout = () => {
      fetchPortfolioContent().then((data) => {
        if (data?.about) setAboutData(data.about);
      });
    };

    loadAbout();
    const unsubscribe = subscribeToContentRefresh(loadAbout);
    return () => unsubscribe();
  }, []);

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-container mx-auto flex flex-col gap-16 items-center relative z-10">
        <div className="flex flex-col items-center gap-8 max-w-4xl w-full text-center">
          <ScrollReveal variant="fade-up">
            <AboutHeader tagline="// ABOUT ME" title="ABOUT DEVELOPER" />
          </ScrollReveal>
          
          <ScrollReveal variant="zoom-in" delay={150}>
            <div className="relative group my-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-mono-700 to-mono-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <AboutProfileImage src="/profile.jpg" alt="Afif Satrio" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={250}>
            <AboutBio paragraphs={getBioParagraphs(aboutData.bio)} />
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={350} className="w-full mt-4">
          <AboutGallery images={galleryImages} />
        </ScrollReveal>
      </div>
    </section>
  );
};
