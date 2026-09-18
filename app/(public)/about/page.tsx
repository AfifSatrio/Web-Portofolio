import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { getAbout, getSkills } from "@/lib/content-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Afif Satrio, a full stack web developer building business websites and custom applications with Next.js, Laravel, and Tailwind CSS.",
};

export default async function AboutPage() {
  const [about, skills] = await Promise.all([getAbout(), getSkills()]);
  return (
    <div className="page-shell">
      <AboutSection initialAbout={about} initialSkills={skills} />
    </div>
  );
}
