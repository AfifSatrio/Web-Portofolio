import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = resolve(process.cwd(), ".env");
const envFile = readFileSync(envPath, "utf8");

for (const line of envFile.split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (!match) continue;

  const [, key, rawValue] = match;
  process.env[key] = rawValue.replace(/^["']|["']$/g, "");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus terisi di .env.");
}

const FALLBACK_TIMESTAMP = "2026-01-01T00:00:00.000Z";

const about = {
  id: "00000000-0000-4000-8000-000000000001",
  tagline: "Fullstack Web Developer | UI/UX Designer",
  bio: "A fullstack developer with hands-on experience in web development, covering both frontend and backend, and skilled in designing intuitive, user-friendly UI/UX using Figma.\n\nComfortable working independently or as part of a team, adaptive to new technologies, and focused on delivering quality work. Beyond that, this developer has a strong interest in photography, mountains and hiking, as well as the esports world. Currently, they're honing their skills at Ratih Creative Media, an agency focused on digital branding and multimedia development.",
  updated_at: FALLBACK_TIMESTAMP,
};

const projects = [
  {
    id: "00000000-0000-4000-8000-000000000201",
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
    id: "00000000-0000-4000-8000-000000000202",
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
    id: "00000000-0000-4000-8000-000000000203",
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
    id: "00000000-0000-4000-8000-000000000204",
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

const skills = [
  ["00000000-0000-4000-8000-000000000101", "Next.js", "Frontend"],
  ["00000000-0000-4000-8000-000000000102", "Tailwind CSS", "Frontend"],
  ["00000000-0000-4000-8000-000000000103", "HTML5 / CSS3", "Frontend"],
  ["00000000-0000-4000-8000-000000000104", "JavaScript / React", "Frontend"],
  ["00000000-0000-4000-8000-000000000105", "Laravel", "Backend"],
  ["00000000-0000-4000-8000-000000000106", "PHP", "Backend"],
  ["00000000-0000-4000-8000-000000000107", "phpMyAdmin / MySQL", "Backend"],
  ["00000000-0000-4000-8000-000000000108", "RESTful API", "Backend"],
  ["00000000-0000-4000-8000-000000000109", "Figma (UI/UX Design)", "Tools"],
  ["00000000-0000-4000-8000-000000000110", "Git / GitHub", "Tools"],
  ["00000000-0000-4000-8000-000000000111", "OBS Studio", "Tools"],
  ["00000000-0000-4000-8000-000000000112", "Kerja Tim", "Soft Skills"],
  ["00000000-0000-4000-8000-000000000113", "Kepemimpinan", "Soft Skills"],
  ["00000000-0000-4000-8000-000000000114", "Manajemen Waktu", "Soft Skills"],
  ["00000000-0000-4000-8000-000000000115", "Komunikasi", "Soft Skills"],
].map(([id, name, category]) => ({
  id,
  name,
  category,
  created_at: FALLBACK_TIMESTAMP,
}));

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function upsertOrThrow(table, rows) {
  const { error } = await supabase.from(table).upsert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
}

await upsertOrThrow("about_content", [about]);
await upsertOrThrow("projects", projects);
await upsertOrThrow("skills", skills);

console.log("Supabase seed selesai: 1 about, 4 projects, 15 skills.");
