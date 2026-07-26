"use client";

import React, { useEffect, useState } from "react";
import { DUMMY_ABOUT } from "@/lib/dummy-data";
import { safeQuery } from "@/lib/supabase";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { AboutContent } from "@/types";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutProfileImage } from "@/components/about/AboutProfileImage";
import { AboutBio } from "@/components/about/AboutBio";
import { AboutGallery, GalleryImage } from "@/components/about/AboutGallery";

const getBioParagraphs = (bio: unknown) => {
  const normalizedBio = typeof bio === "string" && bio.trim().length > 0
    ? bio
    : DUMMY_ABOUT.bio;

  return normalizedBio
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const galleryImages: GalleryImage[] = [
  { src: "/gallery/photo-1.jpg", alt: "Fotografi & Senja" },
  { src: "/gallery/photo-2.jpg", alt: "Potret Satrio" },
  { src: "/gallery/photo-3.jpg", alt: "Puncak Gunung Buthak 2868 MDPL" },
  { src: "/gallery/photo-4.jpg", alt: "Puncak Gunung Kawi 2651 MDPL" },
  { src: "/gallery/photo-5.jpg", alt: "Gunung Kawi 2603 MDPL" },
];

export const AboutSection = () => {
  const [aboutData, setAboutData] = useState<AboutContent>(DUMMY_ABOUT);

  useEffect(() => {
    const loadAbout = () => {
      safeQuery<AboutContent>(
        (client) =>
          client
            .from("about_content")
            .select("*")
            .limit(1)
            .single()
      ).then((data) => {
        if (data) setAboutData(data);
      });
    };

    loadAbout();
    const unsubscribe = subscribeToContentRefresh(loadAbout);
    return () => unsubscribe();
  }, []);

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-16 items-center">
        <div className="flex flex-col items-center gap-8 max-w-5xl w-full">
          <AboutHeader tagline="// ABOUT ME" title="ABOUT DEVELOPER" />
          <AboutProfileImage src="/profile.jpg" alt="Afif Satrio" />
          <AboutBio paragraphs={getBioParagraphs(aboutData.bio)} />
          <AboutGallery images={galleryImages} />
        </div>
      </div>
    </section>
  );
};
