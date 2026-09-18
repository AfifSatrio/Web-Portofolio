import { LayoutDashboard, FolderKanban, Wrench, UserCheck } from "lucide-react";
import type { GalleryImage } from "@/components/about/AboutGallery";

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
