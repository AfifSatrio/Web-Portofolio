"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Detect if text is actually clamped (overflowing)
  useEffect(() => {
    const el = descRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [project.description]);

  return (
    <Card className="flex flex-col justify-between group">
      <div>
        <div className="relative aspect-[16/10] w-full bg-mono-900 overflow-hidden border-b border-mono-700">
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover md:grayscale contrast-125 md:group-hover:scale-105 md:group-hover:grayscale-0 transition-all duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mono-900 via-transparent to-transparent opacity-80" />
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-4">
          <h3 className="font-archivo text-2xl md:text-3xl font-black uppercase tracking-tight text-white md:group-hover:text-mono-300 transition-colors">
            {project.title}
          </h3>

          <div>
            <p
              ref={descRef}
              className={`font-sans text-sm text-mono-500 leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                }`}
            >
              {project.description}
            </p>

            {(isClamped || isExpanded) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-mono-400 hover:text-white transition-colors"
              >
                <span>{isExpanded ? "SHOW LESS" : "SHOW MORE"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech_stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 flex items-center gap-4">
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <Button variant="primary" size="sm" className="w-full gap-2">
              <span>LIVE DEMO</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        )}

        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noreferrer"
            className={project.demo_url ? "shrink-0" : "flex-1"}
          >
            <Button
              variant="outline"
              size="sm"
              className={project.demo_url ? "px-3" : "w-full gap-2"}
            >
              <Github className="w-4 h-4" />
              {!project.demo_url && <span>SOURCE CODE</span>}
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
};
