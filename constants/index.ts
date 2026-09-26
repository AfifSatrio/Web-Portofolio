import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  UserCheck,
  Github,
  Linkedin,
  Instagram,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/afifsatrio", icon: Github },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/afifsatrio/", icon: Linkedin },
  { label: "Instagram", url: "https://instagram.com/afifsatrio_", icon: Instagram },
];
