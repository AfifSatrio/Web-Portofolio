import { LayoutDashboard, FolderKanban, Wrench, UserCheck } from "lucide-react";
import { SkillCategoryData } from "@/components/skills/SkillDonutChart";
import { GalleryImage } from "@/components/about/AboutGallery";

// Navbar & Footer Links
export const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PORTFOLIO", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

// Admin Sidebar Links
export const ADMIN_NAV_LINKS = [
  { name: "DASHBOARD", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "PROJECTS", href: "/admin/projects", icon: FolderKanban },
  { name: "SKILLS", href: "/admin/skills", icon: Wrench },
  { name: "ABOUT", href: "/admin/about", icon: UserCheck },
];

// Social Links (Hero & Contact)
export interface SocialLink {
  label: string;
  url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GITHUB", url: "https://github.com/afifsatrio" },
  { label: "LINKEDIN", url: "https://www.linkedin.com/in/afifsatrio/" },
  { label: "INSTAGRAM", url: "https://instagram.com/afifsatrio_" },
];

// About Section Gallery
export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/gallery/photo-1.jpg", alt: "Fotografi & Senja" },
  { src: "/gallery/photo-2.jpg", alt: "Potret Satrio" },
  { src: "/gallery/photo-3.jpg", alt: "Puncak Gunung Buthak 2868 MDPL" },
  { src: "/gallery/photo-4.jpg", alt: "Puncak Gunung Kawi 2651 MDPL" },
  { src: "/gallery/photo-5.jpg", alt: "Gunung Kawi 2603 MDPL" },
];

// Skill Categories Styles & Configurations
export const DISPLAY_CATEGORIES = ["Frontend", "UI/UX", "Backend"];

// Fixed percentages for the donut chart display
export const CATEGORY_PERCENTAGES: Record<string, number> = {
  Frontend: 60,
  "UI/UX": 25,
  Backend: 15,
};

export const CATEGORY_STYLES: Record<string, Omit<SkillCategoryData, "items" | "percentage" | "startAngle" | "endAngle" | "midAngle">> = {
  Frontend: {
    id: "frontend",
    name: "Frontend",
    color: "#FFFFFF",
    accentColor: "border-white text-white bg-mono-900",
    glowColor: "rgba(255, 255, 255, 0.25)",
    icon: "ph:code-bold",
  },
  "UI/UX": {
    id: "uiux",
    name: "UI/UX",
    color: "#A3A3A3",
    accentColor: "border-mono-500 text-mono-300 bg-mono-900",
    glowColor: "rgba(163, 163, 163, 0.25)",
    icon: "ph:paint-brush-bold",
  },
  Backend: {
    id: "backend",
    name: "Backend",
    color: "#525252",
    accentColor: "border-mono-700 text-mono-400 bg-mono-900",
    glowColor: "rgba(82, 82, 82, 0.25)",
    icon: "ph:database-bold",
  },
};

export const FALLBACK_CATEGORY_STYLES = [
  CATEGORY_STYLES.Frontend,
  CATEGORY_STYLES["UI/UX"],
  CATEGORY_STYLES.Backend,
];

// Random Facts About Me
export interface RandomFact {
  text: string;
  note?: string;
}

export const RANDOM_FACTS: RandomFact[] = [
  { text: "INTP", note: "I'm introvert" },
  { text: "Leo" },
  { text: "Got 470 at TOEFL", note: "Bad at speaking" },
  { text: "Nyctophile one" },
  { text: "Keyboardist" },
  { text: "Bring Me The Horizon enjoyer", note: "Hell yeah" },
  { text: "Cat lovers" },
  { text: "Like solo travelling", note: "Bcs i'm an introvert" },
  { text: "Junior Web Developer" },
  { text: "A people with random thoughts" },
];
