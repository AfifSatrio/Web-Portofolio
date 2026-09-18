"use client";

import { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  ImageOff,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const description = useRef<HTMLParagraphElement>(null);
  const descriptionId = useId();
  useEffect(() => {
    const el = description.current;
    if (!el) return;
    const measure = () => {
      if (!expanded) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.description, expanded]);

  return (
    <article className="surface-panel overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video bg-surface-subtle border-b border-line">
        {imageFailed || !project.thumbnail_url ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-muted text-sm">
            <ImageOff size={24} aria-hidden="true" />
            <span>Preview unavailable</span>
          </div>
        ) : (
          <Image
            src={project.thumbnail_url}
            alt={`${project.title} website preview`}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
            className="object-cover object-top"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h2 className="card-title">
          <Link
            href={`/projects/${project.id}`}
            className="hover:underline underline-offset-4"
          >
            {project.title}
          </Link>
        </h2>
        <p
          id={descriptionId}
          ref={description}
          className={`body-copy mt-4 ${expanded ? "" : "line-clamp-3"}`}
        >
          {project.description}
        </p>
        {(clamped || expanded) && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={descriptionId}
            onClick={() => setExpanded(!expanded)}
            className="flex min-h-11 items-center gap-2 text-sm font-medium self-start hover:underline underline-offset-4"
          >
            {expanded ? "Show less" : "Read more"}
            {expanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>
        )}
        <div className="mt-5 mb-6 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-auto pt-5 border-t border-line flex flex-wrap gap-3">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ size: "sm", className: "flex-1" })}
              aria-label={`View live website: ${project.title}`}
            >
              Live website <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ size: "sm", variant: "outline" })}
              aria-label={`View source code: ${project.title}`}
            >
              <Github size={16} aria-hidden="true" />
              <span className={project.demo_url ? "sr-only" : ""}>
                Source code
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
