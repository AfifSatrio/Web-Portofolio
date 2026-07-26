import { AboutContent, Project, Skill } from "@/types";

const FALLBACK_TIMESTAMP = "2026-01-01T00:00:00.000Z";

export const DUMMY_ABOUT: AboutContent = {
  id: "about-1",
  tagline: "Fullstack Web Developer | UI/UX Designer",
  bio: "A fullstack developer with hands-on experience in web development, covering both frontend and backend, and skilled in designing intuitive, user-friendly UI/UX using Figma.\n\nComfortable working independently or as part of a team, adaptive to new technologies, and focused on delivering quality work. Beyond that, this developer has a strong interest in photography, mountains and hiking, as well as the esports world. Currently, they're honing their skills at Ratih Creative Media, an agency focused on digital branding and multimedia development.",
  updated_at: FALLBACK_TIMESTAMP,
};

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Ratih Creative Media Website & UI/UX",
    description: "Perancangan UI/UX dan pengembangan website profil untuk Ratih Creative Media, sebuah production house di bidang industri kreatif.",
    thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Next.js", "Tailwind CSS", "Figma", "UI/UX"],
    demo_url: "https://github.com/afifsatrio",
    repo_url: "https://github.com/afifsatrio",
    display_order: 1,
    created_at: FALLBACK_TIMESTAMP,
  },
  {
    id: "proj-2",
    title: "Creanomic 2024 Event Website & Media Design",
    description: "Pembuatan website profile acara, desain logo, feeds, merchandise, serta koordinasi tim DDM-IT Creanomic 2024.",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Laravel", "Tailwind CSS", "Figma", "phpMyAdmin"],
    demo_url: "https://github.com/afifsatrio",
    repo_url: "https://github.com/afifsatrio",
    display_order: 2,
    created_at: FALLBACK_TIMESTAMP,
  },
  {
    id: "proj-3",
    title: "PKKMB YUWARAJA XVI Official Website",
    description: "Perancangan desain UI/UX dan sistem informasi acara PKKMB Yuwaraja XVI serta manajemen live streaming OBS.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Next.js", "Tailwind CSS", "Figma", "OBS Studio"],
    demo_url: "https://github.com/afifsatrio",
    repo_url: "https://github.com/afifsatrio",
    display_order: 3,
    created_at: FALLBACK_TIMESTAMP,
  },
  {
    id: "proj-4",
    title: "Company Profile BEM FV UB 2024",
    description: "Konsep proker video company profile dan maintenance portal website resmi BEM Fakultas Vokasi Universitas Brawijaya 2024.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Laravel", "Tailwind CSS", "phpMyAdmin", "Puskominfo"],
    demo_url: "https://github.com/afifsatrio",
    repo_url: "https://github.com/afifsatrio",
    display_order: 4,
    created_at: FALLBACK_TIMESTAMP,
  },
];

export const DUMMY_SKILLS: Skill[] = [
  // Frontend
  { id: "sk-1", name: "Next.js", category: "Frontend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-2", name: "Tailwind CSS", category: "Frontend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-3", name: "HTML5 / CSS3", category: "Frontend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-4", name: "JavaScript / React", category: "Frontend", created_at: FALLBACK_TIMESTAMP },

  // Backend & DB
  { id: "sk-5", name: "Laravel", category: "Backend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-6", name: "PHP", category: "Backend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-7", name: "phpMyAdmin / MySQL", category: "Backend", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-8", name: "RESTful API", category: "Backend", created_at: FALLBACK_TIMESTAMP },

  // Tools & Design
  { id: "sk-9", name: "Figma (UI/UX Design)", category: "Tools", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-10", name: "Git / GitHub", category: "Tools", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-11", name: "OBS Studio", category: "Tools", created_at: FALLBACK_TIMESTAMP },

  // Soft Skills
  { id: "sk-12", name: "Kerja Tim", category: "Soft Skills", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-13", name: "Kepemimpinan", category: "Soft Skills", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-14", name: "Manajemen Waktu", category: "Soft Skills", created_at: FALLBACK_TIMESTAMP },
  { id: "sk-15", name: "Komunikasi", category: "Soft Skills", created_at: FALLBACK_TIMESTAMP },
];
