"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FolderOpen, RefreshCw } from "lucide-react";
import { fetchPortfolioContent } from "@/lib/public-content-api";
import { subscribeToContentRefresh } from "@/lib/content-refresh";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectSkeleton } from "@/components/projects/ProjectSkeleton";
import { Button } from "@/components/ui/Button";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const request = useRef<AbortController | null>(null);
  const loadProjects = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus("loading");
    const data = await fetchPortfolioContent(controller.signal);
    if (controller.signal.aborted) return;
    if (data && Array.isArray(data.projects)) {
      setProjects(data.projects);
      setStatus("ready");
    } else {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadProjects();
    const unsubscribe = subscribeToContentRefresh(loadProjects);
    return () => {
      request.current?.abort();
      unsubscribe();
    };
  }, [loadProjects]);

  const showSkeleton = status === "loading" && projects.length === 0;
  return (
    <section className="content-container" aria-labelledby="projects-title">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-4">Selected work</p>
        <h1 id="projects-title" className="page-title">
          My projects.
        </h1>
        <p className="body-copy mt-5">
          A selection of business websites and web applications. Explore the
          projects, their features, and the technologies behind them.
        </p>
      </div>
      <p role="status" className="sr-only">
        {status === "loading"
          ? "Loading projects…"
          : status === "ready"
            ? `${projects.length} projects loaded.`
            : "Projects could not be refreshed."}
      </p>
      {status === "error" && (
        <div role="alert" className="surface-panel p-6 sm:p-8 mb-6">
          <h2 className="card-title">Unable to load projects</h2>
          <p className="body-copy mt-3">
            Please check your connection and try again.
            {projects.length > 0
              ? " Your previously loaded projects are shown below."
              : ""}
          </p>
          <Button onClick={loadProjects} variant="outline" className="mt-5">
            <RefreshCw size={16} aria-hidden="true" /> Try again
          </Button>
        </div>
      )}
      <div
        aria-busy={status === "loading"}
        aria-label="Project list"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch"
      >
        {showSkeleton
          ? Array.from({ length: 3 }, (_, i) => <ProjectSkeleton key={i} />)
          : projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
      </div>
      {status === "ready" && projects.length === 0 && (
        <div className="surface-panel p-10 sm:p-16 text-center">
          <FolderOpen
            size={32}
            className="mx-auto mb-5 text-ink-secondary"
            aria-hidden="true"
          />
          <h2 className="card-title">New work is on the way</h2>
          <p className="body-copy mt-3">
            There are no published projects to show yet. Please check back soon.
          </p>
        </div>
      )}
    </section>
  );
}
