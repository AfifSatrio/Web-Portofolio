import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { contactHref } from "@/content/site";

export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}

function findProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const project = findProject(params.id);
  return {
    title: project?.title || "Project not found",
    description: project?.description.slice(0, 160),
  };
}
export default function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = findProject(params.id);
  if (!project) notFound();
  return (
    <div className="content-container project-detail">
      <div className="detail-heading">
        <Link href="/#projects" className="text-link">
          <ArrowLeft size={17} aria-hidden="true" /> Back to selected work
        </Link>
        <p className="eyebrow">PROJECT / WEB DEVELOPMENT</p>
        <h1>{project.title}</h1>
      </div>
      <div className="detail-body">
        <div>
          <h2>About the project</h2>
          <p>{project.description}</p>
        </div>
        <aside>
          <h2>The toolkit</h2>
          <div className="detail-tags">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="solid-link"
            >
              Visit live website <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {project.sourceUrl && (
            <p className="mt-5">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View source code <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </p>
          )}
        </aside>
      </div>
      <div className="detail-cta">
        <p>Have something like this in mind?</p>
        <a href={contactHref} className="solid-link">
          Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
