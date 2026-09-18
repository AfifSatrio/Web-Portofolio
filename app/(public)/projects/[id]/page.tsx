import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/content-data";
import { CONTACT_HREF } from "@/lib/profile-content";
import { ProjectPreview } from "@/components/stargazer/ProjectPreview";
import { cache } from "react";

export const dynamic = "force-dynamic";
const findProject = cache(async (id: string) =>
  (await getProjects()).find((project) => project.id === id),
);
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = await findProject(params.id);
  return {
    title: project?.title || "Project not found",
    description: project?.description.slice(0, 160),
  };
}
export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await findProject(params.id);
  if (!project) notFound();
  return (
    <div className="sg-container project-detail">
      <div className="detail-heading">
        <Link href="/#projects" className="sg-text-link">
          <ArrowLeft size={17} aria-hidden="true" /> Back to selected work
        </Link>
        <p className="sg-eyebrow">PROJECT / WEB DEVELOPMENT</p>
        <h1>{project.title}</h1>
      </div>
      <ProjectPreview
        src={project.thumbnail_url}
        title={project.title}
        featured
      />
      <div className="detail-body">
        <div>
          <h2>About the project</h2>
          <p>{project.description}</p>
        </div>
        <aside>
          <h2>The toolkit</h2>
          <div className="sg-tags">
            {project.tech_stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="sg-button"
            >
              Visit live website <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
          {project.repo_url && (
            <p className="mt-5">
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="sg-text-link"
              >
                View source code <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </p>
          )}
        </aside>
      </div>
      <div className="detail-cta">
        <p>Have something like this in mind?</p>
        <a href={CONTACT_HREF} className="sg-button">
          Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
