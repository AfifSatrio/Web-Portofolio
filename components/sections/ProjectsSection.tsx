import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackedSection } from "@/components/ui/StackedSection";

export function ProjectsSection() {
  return (
    <StackedSection id="projects" className="home-section" labelledBy="work-title" index={1}>
      <ScrollReveal className="section-heading">
        <h2 id="work-title">{home.projects.title}</h2>
      </ScrollReveal>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
        {projects.length === 0 && <p className="empty-state">{home.projects.emptyMessage}</p>}
      </div>
    </StackedSection>
  );
}
