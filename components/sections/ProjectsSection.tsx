"use client";

import React, { useEffect, useState } from "react";
import { DUMMY_PROJECTS } from "@/lib/dummy-data";
import { safeQuery } from "@/lib/supabase";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectPagination } from "@/components/projects/ProjectPagination";

const ITEMS_PER_PAGE = 2;

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const loadProjects = () => safeQuery<Project[]>(
      (client) =>
        client
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true })
    ).then((data) => {
      if (data && data.length > 0) setProjects(data);
    });

    loadProjects();
    const unsubscribe = subscribeToContentRefresh(loadProjects);
    const interval = window.setInterval(loadProjects, 5000);

    return () => {
      unsubscribe();
      window.clearInterval(interval);
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
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
            {"// FEATURED WORKS"}
          </span>
          <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            PORTFOLIO PROYEK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
