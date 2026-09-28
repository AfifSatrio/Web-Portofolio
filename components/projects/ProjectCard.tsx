import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-row">
      <Link href={`/projects/${project.id}`} className="project-link">
        <span className="project-number">{String(index).padStart(2, "0")}</span>
        <div className="project-copy">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className="project-tech" aria-label="Technologies">
            {project.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <span className="project-arrow">
          <ArrowUpRight aria-hidden="true" size={25} strokeWidth={1.5} />
        </span>
      </Link>
    </article>
  );
}
