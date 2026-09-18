"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Copy,
  Check,
  Plus,
  ImageOff,
} from "lucide-react";
import type { AboutContent, Project } from "@/types";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/profile-content";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const navigation = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
];
const filters = ["All work", "Websites", "Applications"] as const;
type Filter = (typeof filters)[number];
function name(project: Project) {
  if (/laluna/i.test(project.title)) return "Lalunaspace";
  if (/SIPANDA/i.test(project.title)) return "SIPANDA";
  if (/Ratih/i.test(project.title)) return "Ratih Creative Media";
  return project.title;
}
function category(project: Project): Exclude<Filter, "All work"> {
  return /information\s*system|sipanda|application|dashboard/i.test(
    project.title,
  )
    ? "Applications"
    : "Websites";
}
function excerpt(text: string, limit = 25) {
  const sentence = text.match(/^.*?[.!?]["”]?(?:\s|$)/)?.[0]?.trim() || text;
  const words = sentence.split(/\s+/);
  return words.length > limit
    ? `${words
        .slice(0, limit)
        .join(" ")
        .replace(/[,;:]$/, "")}…`
    : sentence;
}
function Preview({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="studio-preview">
      {project.thumbnail_url && !failed ? (
        <Image
          src={project.thumbnail_url}
          alt={`${name(project)} website preview`}
          fill
          sizes={
            featured
              ? "(min-width: 900px) 760px, 90vw"
              : "(min-width: 900px) 540px, 90vw"
          }
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="studio-image-fallback">
          <ImageOff size={24} aria-hidden="true" /> Preview unavailable
        </span>
      )}
      <span className="studio-preview-action">
        Explore project <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </div>
  );
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
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState<Filter>("All work");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
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
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const item of [...navigation, { id: "contact" }]) {
        const section = document.getElementById(item.id);
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.3
        )
          current = item.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const ordered = [...(projects || [])].sort(
    (a, b) =>
      Number(/laluna/i.test(b.title)) - Number(/laluna/i.test(a.title)) ||
      (a.display_order ?? 999) - (b.display_order ?? 999),
  );
  const selected = ordered.slice(0, 3);
  const visible = selected.filter(
    (project) => filter === "All work" || category(project) === filter,
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
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };
  return (
    <div className="studio-home">
      <header className="studio-topbar">
        <div className="studio-container studio-nav-row">
          <a
            className="studio-brand"
            href="#main-content"
            aria-label="Afif Satrio home"
          >
            afif<span>/</span>satrio
          </a>
          <nav aria-label="Page sections">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="studio-nav-contact"
            href="#contact"
            aria-current={active === "contact" ? "location" : undefined}
          >
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </header>
      <section
        className="studio-container studio-hero"
        aria-labelledby="studio-hero-title"
      >
        <div className="studio-hero-copy">
          <p className="studio-eyebrow">
            <span /> INDEPENDENT WEB DEVELOPER
          </p>
          <h1 id="studio-hero-title">
            Good ideas.
            <br />
            <span>Better websites.</span>
          </h1>
          <p className="studio-hero-description">
            I’m Afif. I build thoughtful websites and web apps
            <br className="studio-desktop-break" /> for people and their
            businesses.
          </p>
          <div className="studio-hero-actions">
            <a href="#projects" className="studio-button">
              Explore my work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a href={CONTACT_HREF} className="studio-text-link">
              Have a project? <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="studio-portrait">
          <div className="studio-photo">
            <Image
              src="/profile.jpg"
              alt="Afif Satrio"
              fill
              priority
              sizes="(min-width: 900px) 310px, 220px"
              className="object-cover object-[center_35%]"
            />
          </div>
          <span className="studio-photo-caption">
            A little curiosity goes a long way.
          </span>
          <span className="studio-photo-label">
            AFIF SATRIO <span>DEVELOPER / INDONESIA</span>
          </span>
        </div>
        <div className="studio-hero-foot">
          <span>DESIGN-MINDED. DEVELOPMENT-DRIVEN.</span>
          <span>
            Next.js <i>/</i> Laravel <i>/</i> Tailwind CSS
          </span>
        </div>
      </section>
      <section
        id="projects"
        className="studio-container studio-section"
        aria-labelledby="studio-work-title"
      >
        <ScrollReveal className="studio-section-heading" duration={500}>
          <div>
            <p className="studio-eyebrow">01 / THE WORK</p>
            <h2 id="studio-work-title">Built with purpose.</h2>
          </div>
          <div
            className="studio-filters"
            role="group"
            aria-label="Filter selected projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>
                  {item === "All work"
                    ? selected.length
                    : selected.filter((p) => category(p) === item).length}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
        <p className="sr-only" role="status">
          {projects === null
            ? "Projects unavailable"
            : `${visible.length} selected ${filter.toLowerCase()} projects shown`}
        </p>
        {projects === null ? (
          <div className="studio-empty">
            <p>Projects couldn’t be loaded.</p>
            <button type="button" onClick={retry} disabled={retrying}>
              {retrying ? "Loading…" : "Try again"}
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="studio-empty">
            <p>
              {selected.length
                ? "No selected projects in this category yet."
                : "New work is on the way."}
            </p>
            {selected.length > 0 && (
              <button onClick={() => setFilter("All work")}>
                Show all work
              </button>
            )}
          </div>
        ) : (
          <div className="studio-project-grid">
            {visible.map((project, index) => {
              const featured = project.id === selected[0]?.id;
              return (
                <ScrollReveal
                  key={project.id}
                  duration={550}
                  delay={index === 2 ? 70 : 0}
                  className={`studio-project ${featured ? "studio-project--featured" : ""}`}
                >
                  <article>
                    <Link
                      href={`/projects/${project.id}`}
                      className="studio-project-link"
                    >
                      <Preview project={project} featured={featured} />
                      <div className="studio-project-copy">
                        <p className="studio-project-label">
                          {featured
                            ? "FEATURED PROJECT"
                            : category(project).toUpperCase()}
                        </p>
                        <h3>
                          {name(project)}{" "}
                          <ArrowUpRight size={22} aria-hidden="true" />
                        </h3>
                        {featured && (
                          <p className="studio-project-description">
                            {excerpt(project.description, 22)}
                          </p>
                        )}
                        <div className="studio-tags">
                          {project.tech_stack.slice(0, 3).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
        <div className="studio-work-footer">
          <span>Real projects. Thoughtfully made.</span>
          <Link href="/projects" className="studio-text-link">
            All projects <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        id="about"
        className="studio-about-band"
        aria-labelledby="studio-about-title"
      >
        <ScrollReveal className="studio-container studio-about">
          <div>
            <p className="studio-eyebrow">02 / A LITTLE ABOUT ME</p>
            <h2 id="studio-about-title">
              Your idea.
              <br />
              My attention to detail.
            </h2>
          </div>
          <div>
            <p>{excerpt(about.bio, 35)}</p>
            <p className="studio-experience">
              Experience at <strong>Ratih Creative Media</strong> and{" "}
              <strong>cmlabs.</strong>
            </p>
            <Link href="/about" className="studio-text-link">
              Meet the developer <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
      <section
        id="services"
        className="studio-container studio-section studio-services-section"
        aria-labelledby="studio-services-title"
      >
        <ScrollReveal duration={500}>
          <p className="studio-eyebrow">03 / HOW I CAN HELP</p>
          <h2 id="studio-services-title">
            From an idea
            <br />
            to something useful.
          </h2>
          <a href={CONTACT_HREF} className="studio-text-link">
            Let’s figure it out <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </ScrollReveal>
        <div className="studio-services">
          {[
            {
              title: "Business websites",
              text: "Company profiles and business websites that make your services easy to discover.",
            },
            {
              title: "Responsive interfaces",
              text: "Thoughtful interfaces that work comfortably on phones, tablets, and desktops.",
            },
            {
              title: "Custom web applications",
              text: "Features, content management, and back-end functionality built around your workflow.",
            },
          ].map((service, index) => (
            <ScrollReveal key={service.title} duration={450} delay={index * 60}>
              <details>
                <summary>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <Plus size={21} aria-hidden="true" />
                </summary>
                <p>{service.text}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section
        id="contact"
        className="studio-contact-band"
        aria-labelledby="studio-contact-title"
      >
        <ScrollReveal
          className="studio-container studio-contact"
          duration={550}
        >
          <p className="studio-eyebrow">04 / LET’S MAKE IT HAPPEN</p>
          <div className="studio-contact-heading">
            <h2 id="studio-contact-title">Something in mind?</h2>
            <a
              href={CONTACT_HREF}
              className="studio-contact-arrow"
              aria-label="Email Afif about your project"
            >
              <ArrowUpRight size={44} strokeWidth={1.3} aria-hidden="true" />
            </a>
          </div>
          <div className="studio-email-row">
            <a href={CONTACT_HREF}>{CONTACT_EMAIL}</a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={
                copyStatus === "copied" ? "Email copied" : "Copy email address"
              }
            >
              {copyStatus === "copied" ? (
                <Check size={17} aria-hidden="true" />
              ) : (
                <Copy size={17} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="studio-copy-status" role="status">
            {copyStatus === "copied"
              ? "Email copied to clipboard."
              : copyStatus === "error"
                ? "Copy unavailable. Select the email above or click it to open your email app."
                : "Tell me a little about your project. We’ll take it from there."}
          </p>
        </ScrollReveal>
      </section>
      <footer className="studio-container studio-footer">
        <a className="studio-brand" href="#main-content">
          afif<span>/</span>satrio
        </a>
        <p>© {new Date().getFullYear()} Afif Satrio</p>
        <nav aria-label="Social links">
          <a
            href="https://github.com/afifsatrio"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/afifsatrio/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
        </nav>
      </footer>
    </div>
  );
}
