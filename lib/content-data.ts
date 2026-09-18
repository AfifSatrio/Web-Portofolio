import { AboutContent, Project, Skill } from "@/types";
import {
  PROFILE_ABOUT as EMPTY_ABOUT,
  normalizeAbout,
  normalizeSkills,
} from "@/lib/profile-content";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export interface PortfolioContent {
  about: AboutContent;
  projects: Project[];
  skills: Skill[];
}

export {
  PROFILE_ABOUT as EMPTY_ABOUT,
  normalizeAbout,
} from "@/lib/profile-content";

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await createSupabaseAdminClient()
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as Project[];
  } catch {
    throw new Error("Projects could not be loaded.");
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
    return normalizeSkills(data as Skill[]);
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
