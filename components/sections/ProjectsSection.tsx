"use client";

import React, { useEffect, useState } from "react";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectPagination } from "@/components/projects/ProjectPagination";

const ITEMS_PER_PAGE = 2;

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const loadProjects = () => fetchPortfolioContent().then((data) => {
      if (data?.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
        setCurrentPage(1);
      } else {
        setProjects([]);
      }
    });

    loadProjects();
    const unsubscribe = subscribeToContentRefresh(loadProjects);

    return () => {
      unsubscribe();
    };
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto flex flex-col gap-12">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              {"// FEATURED WORKS"}
            </span>
            <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              MY PROJECTS
            </h2>
          </div>
        </ScrollReveal>

        {projects.length === 0 ? (
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="w-full py-16 px-6 border border-mono-800 rounded-[12px] bg-mono-900/50 flex flex-col items-center justify-center text-center gap-3">
              <p className="font-archivo text-xl sm:text-2xl font-bold text-mono-300">
                {"I haven't uploaded my portfolio here yet :("}
              </p>
              <p className="font-sans text-xs text-mono-500">
                Check back soon for new projects and updates!
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProjects.map((project, idx) => (
                <ScrollReveal key={project.id} variant="fade-up" delay={150 + idx * 120}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>

            <ProjectPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};
