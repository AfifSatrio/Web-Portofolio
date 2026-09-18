import { PortfolioHome } from "@/components/portfolio/PortfolioHome";
import { getAbout, getProjects } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [about, projects] = await Promise.all([
    getAbout(),
    getProjects().catch(() => null),
  ]);
  return <PortfolioHome initialAbout={about} initialProjects={projects} />;
}
