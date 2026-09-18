"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  Code2,
} from "lucide-react";
import { AboutContent, Skill } from "@/types";
import {
  PROFILE_ABOUT,
  SERVICES,
  SKILL_CATEGORIES,
  CONTACT_HREF,
} from "@/lib/profile-content";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AboutGallery } from "@/components/about/AboutGallery";
import { GALLERY_IMAGES } from "@/constants";

export function AboutSection({
  initialAbout = PROFILE_ABOUT,
  initialSkills = [],
}: {
  initialAbout?: AboutContent;
  initialSkills?: Skill[];
}) {
  const [about, setAbout] = useState(initialAbout);
  const [skills, setSkills] = useState(initialSkills);
  useEffect(
    () =>
      subscribeToContentRefresh(async () => {
        const data = await fetchPortfolioContent();
        if (data) {
          setAbout(data.about);
          setSkills(data.skills);
        }
      }),
    [],
  );
  const categories = Array.from(
    new Set([...SKILL_CATEGORIES, ...skills.map((skill) => skill.category)]),
  );

  return (
    <div className="content-container">
      <section
        aria-labelledby="about-title"
        className="grid items-start gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20 pb-16 sm:pb-20"
      >
        <div>
          <p className="eyebrow mb-5">About / Afif Satrio</p>
          <h1 id="about-title" className="page-title max-w-3xl">
            Websites built
            <br className="hidden sm:block" /> around your needs.
          </h1>
          <p className="mt-6 text-lg font-medium text-ink">{about.tagline}</p>
          <div className="mt-6 space-y-4 max-w-2xl body-copy">
            {about.bio.split(/\n{2,}/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={buttonStyles()}>
              Explore my work <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={CONTACT_HREF}
              className={buttonStyles({ variant: "outline" })}
            >
              Let’s talk by email <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {about.cv_url && (
              <a
                href={about.cv_url}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ variant: "ghost" })}
              >
                View résumé
              </a>
            )}
          </div>
        </div>
        <div className="surface-panel p-5 sm:p-6 max-w-md w-full lg:mt-10">
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-surface-subtle">
            <Image
              src="/profile.jpg"
              alt="Afif Satrio"
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 400px, 80vw"
              className="object-cover object-[center_35%]"
              priority
            />
          </div>
          <div className="pt-5">
            <p className="text-xl font-semibold">Afif Satrio</p>
            <p className="mt-1 text-sm text-ink-secondary">
              Full Stack Web Developer
            </p>
            <div className="mt-5 border-t border-line pt-5 flex flex-wrap gap-2">
              <Badge>Solution oriented</Badge>
              <Badge>Accountable for outcomes</Badge>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-title"
        className="section-space border-t border-line"
      >
        <div className="grid gap-4 md:grid-cols-2 md:items-end mb-8">
          <div>
            <p className="eyebrow mb-3">What I can help with</p>
            <h2 id="services-title" className="section-title">
              From idea to website.
            </h2>
          </div>
          <p className="body-copy max-w-lg">
            Company profiles, responsive interfaces, and custom applications
            shaped around your business requirements.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={index * 50}
              className="h-full"
            >
              <article className="surface-panel p-6 sm:p-8 h-full">
                <span className="text-sm text-ink-muted font-mono">
                  0{index + 1}
                </span>
                <h3 className="card-title mt-5">{service.title}</h3>
                <p className="body-copy mt-3">{service.description}</p>
                <p className="mt-6 pt-4 border-t border-line text-xs leading-relaxed text-ink-muted">
                  {service.detail}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="experience-title"
        className="section-space border-t border-line grid gap-8 lg:grid-cols-[1fr_2fr]"
      >
        <div>
          <p className="eyebrow mb-3">Experience & education</p>
          <h2 id="experience-title" className="section-title">
            My background.
          </h2>
          <p className="body-copy mt-4">
            Over one year of experience developing websites and web-based
            information systems.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: BriefcaseBusiness,
              title: "Web Developer",
              name: "Ratih Creative Media",
              detail: "Professional experience",
            },
            {
              icon: Code2,
              title: "Frontend Web Developer Intern",
              name: "cmlabs",
              detail: "Internship",
            },
            {
              icon: GraduationCap,
              title: "Associate’s degree in Information Technology",
              name: "Brawijaya University",
              detail: "2023–2026",
            },
            {
              icon: Award,
              title: "Junior Web Developer",
              name: "BNSP certification",
              detail: "Certification",
            },
          ].map((item) => (
            <article key={item.name} className="surface-panel p-6">
              <item.icon
                size={22}
                className="text-ink-secondary mb-5"
                aria-hidden="true"
              />
              <p className="eyebrow mb-3">{item.detail}</p>
              <h3 className="text-lg leading-snug font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-ink-secondary mt-2">{item.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="skills-title"
        className="section-space border-t border-line"
      >
        <p className="eyebrow mb-3">Skills & technologies</p>
        <h2 id="skills-title" className="section-title">
          The tools behind the work.
        </h2>
        <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {categories.map((category) => {
            const items = skills.filter((skill) => skill.category === category);
            return (
              items.length > 0 && (
                <div key={category} className="py-6 border-b border-line">
                  <h3 className="text-base font-semibold mb-4">
                    {category === "Tools" ? "Delivery & tools" : category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill.id}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              )
            );
          })}
        </div>
        {skills.length === 0 && (
          <p className="body-copy mt-6">
            Explore my projects to see the technologies used in each build.
          </p>
        )}
      </section>

      <section
        aria-labelledby="current-title"
        className="section-space border-t border-line"
      >
        <div className="surface-panel p-6 sm:p-8 grid gap-5 md:grid-cols-[1fr_2fr]">
          <div>
            <Badge>In progress</Badge>
            <h2 id="current-title" className="card-title mt-4">
              Currently building
            </h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">A food-ordering website</h3>
            <p className="body-copy mt-3">
              I’m developing a food-ordering website with a planned Olsera POS
              integration. The project is still in progress.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="personal-title"
        className="section-space border-t border-line"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-3">Beyond work</p>
            <h2 id="personal-title" className="section-title">
              Away from the screen.
            </h2>
          </div>
          <p className="body-copy max-w-md">
            Photography, hiking, music, and a little gaming. A few moments from
            outside my development work.
          </p>
        </div>
        <AboutGallery images={GALLERY_IMAGES} />
      </section>

      <section
        aria-labelledby="about-cta"
        className="border-t border-line pt-12 sm:pt-16 flex flex-col sm:flex-row justify-between gap-6 sm:items-center"
      >
        <div>
          <h2 id="about-cta" className="section-title">
            Have a website in mind?
          </h2>
          <p className="body-copy mt-3">
            Let’s discuss the features, scope, and next steps.
          </p>
        </div>
        <a
          href={CONTACT_HREF}
          className={buttonStyles({ className: "shrink-0 self-start" })}
        >
          Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
