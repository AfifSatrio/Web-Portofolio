import { AboutContent, Project, Skill } from "@/types";

export const DUMMY_ABOUT: AboutContent = {
  id: "about-1",
  tagline: "Frontend Developer | Passionate about Clean UI & Interactive Web Experiences",
  bio: "Saya adalah seorang Frontend Developer yang berfokus pada pembuatan antarmuka web modern, minimalis, dan berperforma tinggi. Dengan latar belakang yang kuat dalam arsitektur komponen React, Next.js, dan sistem desain yang presisi, saya berkomitmen untuk menghadirkan pengalaman pengguna yang intuitif serta estetis.",
  cv_url: "/resume.pdf",
  updated_at: new Date().toISOString(),
};

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Minimalist E-Commerce Platform",
    description: "Platform e-commerce dengan arsitektur headless, performa tinggi, pencarian instan, dan alur pembayaran checkout yang seamless.",
    thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
    demo_url: "https://example.com/demo-ecommerce",
    repo_url: "https://github.com/example/ecommerce-app",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "proj-2",
    title: "AI Workspace & Task Manager",
    description: "Aplikasi manajemen tugas cerdas yang mengintegrasikan AI assistant untuk pengelompokan prioritas dan pelacakan produktivitas tim secara real-time.",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "OpenAI API"],
    demo_url: "https://example.com/demo-ai-task",
    repo_url: "https://github.com/example/ai-task-manager",
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "proj-3",
    title: "Developer Documentation Portal",
    description: "Portal dokumentasi teknis dengan sintaks highlighting cepat, mode monokromik tajam, serta pencarian berbasis fuzzy search.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Next.js", "MDX", "Tailwind CSS", "Algolia"],
    demo_url: "https://example.com/demo-docs",
    repo_url: "https://github.com/example/dev-docs",
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "proj-4",
    title: "Financial Analytics Dashboard",
    description: "Dashboard analisis keuangan real-time dengan visualisasi grafik interaktif, ekspor laporan, dan proteksi role-based access.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript", "Chart.js", "Supabase"],
    demo_url: "https://example.com/demo-finance",
    repo_url: "https://github.com/example/finance-dashboard",
    display_order: 4,
    created_at: new Date().toISOString(),
  },
];

export const DUMMY_SKILLS: Skill[] = [
  // Frontend
  { id: "sk-1", name: "Next.js / React", category: "Frontend", created_at: new Date().toISOString() },
  { id: "sk-2", name: "TypeScript", category: "Frontend", created_at: new Date().toISOString() },
  { id: "sk-3", name: "Tailwind CSS", category: "Frontend", created_at: new Date().toISOString() },
  { id: "sk-4", name: "HTML5 / CSS3", category: "Frontend", created_at: new Date().toISOString() },
  { id: "sk-5", name: "Three.js / React Three Fiber", category: "Frontend", created_at: new Date().toISOString() },
  
  // Backend & Cloud
  { id: "sk-6", name: "Node.js / Express", category: "Backend", created_at: new Date().toISOString() },
  { id: "sk-7", name: "Supabase / Postgres", category: "Backend", created_at: new Date().toISOString() },
  { id: "sk-8", name: "Firebase (Auth / Firestore)", category: "Backend", created_at: new Date().toISOString() },
  { id: "sk-9", name: "RESTful & GraphQL API", category: "Backend", created_at: new Date().toISOString() },

  // Tools & Workflow
  { id: "sk-10", name: "Git / GitHub", category: "Tools", created_at: new Date().toISOString() },
  { id: "sk-11", name: "Figma (UI/UX Design)", category: "Tools", created_at: new Date().toISOString() },
  { id: "sk-12", name: "Vercel / Netlify", category: "Tools", created_at: new Date().toISOString() },
  { id: "sk-13", name: "Docker (Basic)", category: "Tools", created_at: new Date().toISOString() },

  // Soft Skills
  { id: "sk-14", name: "Problem Solving", category: "Soft Skills", created_at: new Date().toISOString() },
  { id: "sk-15", name: "Clean Code & Refactoring", category: "Soft Skills", created_at: new Date().toISOString() },
  { id: "sk-16", name: "Agile / Teamwork", category: "Soft Skills", created_at: new Date().toISOString() },
];
