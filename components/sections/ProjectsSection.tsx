"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { DUMMY_PROJECTS } from "@/lib/dummy-data";

export const ProjectsSection = () => {
  const [selectedTech, setSelectedTech] = useState<string>("ALL");

  // Extract all unique tech tags
  const allTechs = ["ALL", ...Array.from(new Set(DUMMY_PROJECTS.flatMap((p) => p.tech_stack)))];

  const filteredProjects =
    selectedTech === "ALL"
      ? DUMMY_PROJECTS
      : DUMMY_PROJECTS.filter((p) => p.tech_stack.includes(selectedTech));

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-16 border-b border-mono-700 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              // FEATURED WORKS
            </span>
            <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              PORTFOLIO PROYEK
            </h2>
          </div>

          {/* Tech Stack Filter Tags */}
          <div className="flex flex-wrap gap-2 max-w-lg">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider rounded-full transition-all border ${
                  selectedTech === tech
                    ? "bg-white text-black border-white font-bold"
                    : "bg-mono-900 text-mono-500 border-mono-700 hover:text-white hover:border-mono-500"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (No separate detail page needed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between group">
              <div>
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[16/10] w-full bg-mono-900 overflow-hidden border-b border-mono-700">
                  <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mono-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col gap-4">
                  <h3 className="font-archivo text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-mono-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-sm text-mono-500 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
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
          ))}
        </div>
      </div>
    </section>
  );
};
