import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Afif Satrio’s business websites and web applications, including SIPANDA, Lalunaspace, and Ratih Creative Media.",
};
export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <ProjectsSection />
    </div>
  );
}
