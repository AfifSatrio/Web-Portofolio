"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import type { AboutContent, Project } from "@/types";
import { CONTACT_EMAIL, CONTACT_HREF, TECH_STACK } from "@/lib/profile-content";
import { SOCIAL_LINKS } from "@/constants";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

const filters = ["All", "Websites", "Applications"] as const;
type Filter = (typeof filters)[number];
function category(project: Project) {
  return /information\s*system|sipanda|application|dashboard/i.test(
    project.title,
  )
    ? "Applications"
    : "Websites";
}

export function PortfolioHome({
  initialAbout,
  initialProjects,
}: {
  initialAbout: AboutContent;
  initialProjects: Project[] | null;
}) {
  const [about, setAbout] = useState(initialAbout);
  const [projects, setProjects] = useState(initialProjects);
  const [retrying, setRetrying] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();
  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeToContentRefresh(async () => {
      const content = await fetchPortfolioContent();
      if (mounted && content) {
        setAbout(content.about);
        setProjects(content.projects);
      }
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);
  const selected = [...(projects || [])].sort(
    (a, b) => (a.display_order ?? 999) - (b.display_order ?? 999),
  );
  const visible = selected.filter(
    (project) => filter === "All" || category(project) === filter,
  );
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
    <>
      <section
        id="about"
        className="content-container home-hero"
        aria-labelledby="hero-title"
      >
        <ScrollReveal className="hero-intro">
          <p className="eyebrow">01 / About — Afif Satrio</p>
          <p className="hero-location">Based in Indonesia</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h1 id="hero-title">
            Hi, I’m Afif.
            <br />
            <span>I build for the web.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={160} className="hero-bottom">
          <p>{about.bio.split(/\n{2,}/)[0]}</p>
          <a href="#projects" className="round-link">
            Explore the work{" "}
            <span>
              <ArrowDown size={20} aria-hidden="true" />
            </span>
          </a>
        </ScrollReveal>
        <ScrollReveal delay={220} className="hero-stack">
          <h2 className="eyebrow">My everyday stack</h2>
          <ul className="stack-list" aria-label="Frequently used technologies">
            {TECH_STACK.map((tech) => (
              <motion.li
                key={tech}
                whileHover={reduced ? undefined : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <section
        id="projects"
        className="content-container home-section"
        aria-labelledby="work-title"
      >
        <ScrollReveal className="section-heading">
          <div>
            <p className="eyebrow">02 / Portfolio</p>
            <h2 id="work-title">A few things I’ve built.</h2>
          </div>
          <div
            className="work-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {filter === item && (
                  <motion.span
                    className="filter-indicator"
                    layoutId="work-filter"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 350, damping: 32 }
                    }
                  />
                )}
                <span>{item}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>
        <p role="status" className="sr-only">
          {projects === null
            ? "Projects unavailable"
            : `${visible.length} projects shown`}
        </p>
        {projects === null ? (
          <div className="empty-state">
            <p>Projects couldn’t be loaded.</p>
            <button className="text-link" onClick={retry} disabled={retrying}>
              {retrying ? "Loading…" : "Try again"}
            </button>
          </div>
        ) : (
          <motion.div layout={!reduced} className="project-list">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  key={project.id}
                  layout={!reduced}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    index={selected.indexOf(project) + 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {visible.length === 0 && (
              <p className="empty-state">
                {selected.length
                  ? "No projects in this category yet."
                  : "New work is on the way."}
              </p>
            )}
          </motion.div>
        )}
      </section>

      <section
        id="contact"
        className="content-container home-contact"
        aria-labelledby="contact-title"
      >
        <ScrollReveal>
          <p className="eyebrow">03 / Contact</p>
          <h2 id="contact-title">Let’s connect.</h2>
          <p className="contact-intro">
            Have a project in mind, or just want to say hello?
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="contact-links" aria-label="Contact and social profiles">
            {[
              { label: "Email", url: CONTACT_HREF, detail: CONTACT_EMAIL },
              ...SOCIAL_LINKS.map((link) => ({
                ...link,
                detail: link.label === "Instagram" ? "@afifsatrio_" : "@afifsatrio",
              })),
            ].map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.url}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                  whileHover={reduced ? undefined : { x: 4 }}
                  whileTap={reduced ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>
                    <span className="contact-label">{link.label}</span>
                    <span className="contact-detail">{link.detail}</span>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </motion.a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>
    </>
  );
}
