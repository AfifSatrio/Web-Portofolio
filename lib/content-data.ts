import { AboutContent, Project, Skill } from "@/types";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export interface PortfolioContent {
  about: AboutContent;
  projects: Project[];
  skills: Skill[];
}

export const EMPTY_ABOUT: AboutContent = {
  id: "",
  tagline: "",
  bio: "",
  cv_url: "",
  updated_at: new Date().toISOString(),
};

export const normalizeAbout = (about: Partial<AboutContent> | null | undefined): AboutContent => ({
  ...EMPTY_ABOUT,
  ...about,
  tagline: typeof about?.tagline === "string" && about.tagline.trim()
    ? about.tagline.trim()
    : EMPTY_ABOUT.tagline,
  bio: typeof about?.bio === "string" && about.bio.trim()
    ? about.bio
        .replace(/\r\n/g, "\n")
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .join("\n\n")
    : EMPTY_ABOUT.bio,
  cv_url: typeof about?.cv_url === "string" && about.cv_url.trim()
    ? about.cv_url.trim()
    : EMPTY_ABOUT.cv_url,
});

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await createSupabaseAdminClient()
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data as Project[];
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await createSupabaseAdminClient()
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) return [];
    return data as Skill[];
  } catch {
    return [];
  }
}

export async function getAbout(): Promise<AboutContent> {
  try {
    const { data, error } = await createSupabaseAdminClient()
      .from("about_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) return EMPTY_ABOUT;
    return normalizeAbout(data);
  } catch {
    return EMPTY_ABOUT;
  }
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [about, projects, skills] = await Promise.all([
    getAbout(),
    getProjects(),
    getSkills(),
  ]);

  return { about, projects, skills };
}
