"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Globe2,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";
import type { AboutContent, Project } from "@/types";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/profile-content";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { ChapterReveal } from "./ChapterReveal";
import { NightSky } from "./NightSky";
import { ProjectPreview } from "./ProjectPreview";

function projectName(project: Project) {
  if (/laluna/i.test(project.title)) return "Lalunaspace";
  if (/SIPANDA/i.test(project.title)) return "SIPANDA";
  if (/Ratih/i.test(project.title)) return "Ratih Creative Media";
  return project.title;
}
function excerpt(text: string, limit: number) {
  const sentence = text.match(/^.*?[.!?]["”]?(?:\s|$)/)?.[0]?.trim() || text;
  const words = sentence.split(/\s+/);
  return words.length > limit
    ? `${words
        .slice(0, limit)
        .join(" ")
        .replace(/[,;:]$/, "")}…`
    : sentence;
}

export function StargazerHome({
  initialAbout,
  initialProjects,
}: {
  initialAbout: AboutContent;
  initialProjects: Project[] | null;
}) {
  const [about, setAbout] = useState(initialAbout);
  const [projects, setProjects] = useState(initialProjects);
  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    let active = true;
    const unsubscribe = subscribeToContentRefresh(async () => {
      const content = await fetchPortfolioContent();
      if (active && content) {
        setProjects(content.projects);
        setAbout(content.about);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);
  const ordered = [...(projects || [])].sort(
    (a, b) =>
      Number(/laluna/i.test(b.title)) - Number(/laluna/i.test(a.title)) ||
      (a.display_order ?? 999) - (b.display_order ?? 999),
  );
  const [featured, ...others] = ordered;
  const retry = async () => {
    setRetrying(true);
    const content = await fetchPortfolioContent();
    if (content) {
      setProjects(content.projects);
      setAbout(content.about);
    }
    setRetrying(false);
  };
  return (
    <div className="stargazer-landing">
      <NightSky />
      <section className="stargazer-hero" aria-labelledby="hero-title">
        <ChapterReveal className="sg-container hero-content">
          <p className="sg-eyebrow hero-intro">
            <span className="tiny-star">✦</span> AFIF SATRIO · FULL STACK
            DEVELOPER
          </p>
          <h1 id="hero-title">
            Thoughtful websites.
            <br />
            Built to <em>shine.</em>
          </h1>
          <p className="hero-description">
            Business websites and web apps, built around you.
          </p>
          <div className="hero-actions">
            <a className="sg-button" href="#work">
              Explore my work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="sg-text-link" href={CONTACT_HREF}>
              Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </ChapterReveal>
        <div className="sg-container hero-bottom">
          <a href="#work">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </a>
          <span>
            BASED IN INDONESIA <span className="location-dot">·</span> BUILDING
            FOR EVERYWHERE
          </span>
        </div>
      </section>

      <section
        id="work"
        className="sg-container sg-section work-section"
        aria-labelledby="work-title"
      >
        <ChapterReveal>
          <div className="section-heading">
            <div>
              <p className="sg-eyebrow">01 / SELECTED WORK</p>
              <h2 id="work-title">
                Ideas brought <em>to life.</em>
              </h2>
            </div>
          </div>
        </ChapterReveal>
        {projects === null ? (
          <div className="sg-empty" role="status">
            <p>Projects couldn’t be loaded. Please try again.</p>
            <button
              className="sg-text-link"
              onClick={retry}
              disabled={retrying}
            >
              {retrying ? "Loading…" : "Retry loading projects"}{" "}
              <ArrowRight size={16} />
            </button>
          </div>
        ) : !featured ? (
          <p className="sg-empty">
            New work is on the way. In the meantime,{" "}
            <a href={CONTACT_HREF}>let’s talk about your project.</a>
          </p>
        ) : (
          <>
            <ChapterReveal>
              <article className="featured-project">
                <Link
                  href={`/projects/${featured.id}`}
                  className="project-visual-link"
                  aria-label={`Explore ${projectName(featured)}`}
                >
                  <ProjectPreview
                    src={featured.thumbnail_url}
                    title={projectName(featured)}
                    featured
                  />
                  <span className="preview-open">
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </Link>
                <div className="featured-copy">
                  <p className="sg-eyebrow">
                    <span className="tiny-star">✦</span> FEATURED PROJECT
                  </p>
                  <h3>
                    <Link href={`/projects/${featured.id}`}>
                      {projectName(featured)}
                    </Link>
                  </h3>
                  <p>{excerpt(featured.description, 22)}</p>
                  <div className="sg-tags">
                    {featured.tech_stack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${featured.id}`}
                    className="sg-text-link"
                  >
                    Explore project{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </ChapterReveal>
            <div className="secondary-projects">
              {others.slice(0, 2).map((project, index) => (
                <ChapterReveal key={project.id} delay={index * 80}>
                  <article className="secondary-project">
                    <Link
                      href={`/projects/${project.id}`}
                      className="project-visual-link"
                      aria-label={`Explore ${projectName(project)}`}
                    >
                      <ProjectPreview
                        src={project.thumbnail_url}
                        title={projectName(project)}
                      />
                      <span className="preview-open">
                        <ArrowUpRight size={22} aria-hidden="true" />
                      </span>
                    </Link>
                    <div className="secondary-project-title">
                      <div>
                        <p className="sg-eyebrow">
                          {String(index + 2).padStart(2, "0")} / WEB DEVELOPMENT
                        </p>
                        <h3>
                          <Link href={`/projects/${project.id}`}>
                            {projectName(project)}
                          </Link>
                        </h3>
                      </div>
                      <Link
                        className="circle-link"
                        href={`/projects/${project.id}`}
                        aria-label={`Explore ${projectName(project)}`}
                      >
                        <ArrowUpRight size={22} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </ChapterReveal>
              ))}
            </div>
          </>
        )}
        <div className="work-footer">
          <Link className="sg-text-link" href="/projects">
            View all projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        id="services"
        className="services-section sg-section"
        aria-labelledby="services-title"
      >
        <div className="sg-container">
          <ChapterReveal>
            <div className="section-heading">
              <div>
                <p className="sg-eyebrow">02 / HOW I CAN HELP</p>
                <h2 id="services-title">
                  What I can <em>help with.</em>
                </h2>
              </div>
            </div>
          </ChapterReveal>
          <div className="service-list">
            {[
              {
                icon: Globe2,
                title: "Business websites",
                text: "A clear, memorable home for your brand.",
              },
              {
                icon: PanelsTopLeft,
                title: "Responsive interfaces",
                text: "Easy to use, on every screen.",
              },
              {
                icon: Workflow,
                title: "Web applications",
                text: "Custom features for the way you work.",
              },
            ].map((service, index) => (
              <ChapterReveal key={service.title} delay={index * 85}>
                <article className="service-row">
                  <span className="service-number">0{index + 1}</span>
                  <service.icon
                    size={25}
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                  <h3>{service.title}</h3>
                  <div>
                    <p>{service.text}</p>
                  </div>
                </article>
              </ChapterReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="sg-container sg-section about-section"
        aria-labelledby="about-title"
      >
        <ChapterReveal className="about-photo-wrap">
          <div className="about-photo">
            <Image
              src="/profile.jpg"
              alt="Afif Satrio"
              fill
              sizes="(min-width: 900px) 420px, 85vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <span className="photo-star" aria-hidden="true">
            ✦
          </span>
        </ChapterReveal>
        <ChapterReveal className="about-copy">
          <p className="sg-eyebrow">03 / ABOUT ME</p>
          <h2 id="about-title">
            Hi, I’m Afif.
            <br />
            <em>Always looking up.</em>
          </h2>
          <p>{excerpt(about.bio, 30)}</p>
          <Link href="/about" className="sg-text-link">
            More about me <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </ChapterReveal>
      </section>

      <section
        id="contact"
        className="contact-landing sg-section"
        aria-labelledby="contact-title"
      >
        <ChapterReveal className="sg-container contact-inner">
          <p className="sg-eyebrow">04 / A NEW BEGINNING</p>
          <span className="contact-star" aria-hidden="true">
            ✦
          </span>
          <h2 id="contact-title">
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <a href={CONTACT_HREF} className="sg-button">
            Let’s talk <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <a href={CONTACT_HREF} className="contact-email">
            {CONTACT_EMAIL}
          </a>
        </ChapterReveal>
      </section>
    </div>
  );
}
