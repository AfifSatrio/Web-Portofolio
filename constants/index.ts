import { LayoutDashboard, FolderKanban, Wrench, UserCheck } from "lucide-react";

// Admin Sidebar Links
export const ADMIN_NAV_LINKS = [
  { name: "DASHBOARD", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "PROJECTS", href: "/admin/projects", icon: FolderKanban },
  { name: "SKILLS", href: "/admin/skills", icon: Wrench },
  { name: "ABOUT", href: "/admin/about", icon: UserCheck },
];

// Contact social profiles
interface SocialLink {
  label: string;
  url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/afifsatrio" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/afifsatrio/" },
  { label: "Instagram", url: "https://instagram.com/afifsatrio_" },
];
