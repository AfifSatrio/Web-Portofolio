import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="section-stack">
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
