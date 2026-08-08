create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  thumbnail_url text not null,
  tech_stack text[] not null default '{}',
  demo_url text,
  repo_url text,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists about_content (
  id uuid primary key default gen_random_uuid(),
  bio text not null,
  tagline text not null,
  cv_url text,
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;
alter table skills enable row level security;
alter table about_content enable row level security;

drop policy if exists "Public projects are readable" on projects;
create policy "Public projects are readable"
  on projects for select
  using (true);

drop policy if exists "Public skills are readable" on skills;
create policy "Public skills are readable"
  on skills for select
  using (true);

drop policy if exists "Public about content is readable" on about_content;
create policy "Public about content is readable"
  on about_content for select
  using (true);

insert into about_content (id, tagline, bio, updated_at)
values (
  '00000000-0000-4000-8000-000000000001',
  'Fullstack Web Developer | UI/UX Designer',
  'A fullstack developer with hands-on experience in web development, covering both frontend and backend, and skilled in designing intuitive, user-friendly UI/UX using Figma.

Comfortable working independently or as part of a team, adaptive to new technologies, and focused on delivering quality work. Beyond that, this developer has a strong interest in photography, mountains and hiking, as well as the esports world. Currently, they''re honing their skills at Ratih Creative Media, an agency focused on digital branding and multimedia development.',
  '2026-01-01T00:00:00.000Z'
)
on conflict (id) do update
set tagline = excluded.tagline,
    bio = excluded.bio,
    updated_at = excluded.updated_at;

insert into projects (id, title, description, thumbnail_url, tech_stack, demo_url, repo_url, display_order, created_at)
values
  ('00000000-0000-4000-8000-000000000201', 'Ratih Creative Media Website & UI/UX', 'Perancangan UI/UX dan pengembangan website profil untuk Ratih Creative Media, sebuah production house di bidang industri kreatif.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop', array['Next.js', 'Tailwind CSS', 'Figma', 'UI/UX'], 'https://github.com/afifsatrio', 'https://github.com/afifsatrio', 1, '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000202', 'Creanomic 2024 Event Website & Media Design', 'Pembuatan website profile acara, desain logo, feeds, merchandise, serta koordinasi tim DDM-IT Creanomic 2024.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', array['Laravel', 'Tailwind CSS', 'Figma', 'phpMyAdmin'], 'https://github.com/afifsatrio', 'https://github.com/afifsatrio', 2, '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000203', 'PKKMB YUWARAJA XVI Official Website', 'Perancangan desain UI/UX dan sistem informasi acara PKKMB Yuwaraja XVI serta manajemen live streaming OBS.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop', array['Next.js', 'Tailwind CSS', 'Figma', 'OBS Studio'], 'https://github.com/afifsatrio', 'https://github.com/afifsatrio', 3, '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000204', 'Company Profile BEM FV UB 2024', 'Konsep proker video company profile dan maintenance portal website resmi BEM Fakultas Vokasi Universitas Brawijaya 2024.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', array['Laravel', 'Tailwind CSS', 'phpMyAdmin', 'Puskominfo'], 'https://github.com/afifsatrio', 'https://github.com/afifsatrio', 4, '2026-01-01T00:00:00.000Z')
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    thumbnail_url = excluded.thumbnail_url,
    tech_stack = excluded.tech_stack,
    demo_url = excluded.demo_url,
    repo_url = excluded.repo_url,
    display_order = excluded.display_order,
    created_at = excluded.created_at;

insert into skills (id, name, category, created_at)
values
  ('00000000-0000-4000-8000-000000000101', 'Next.js', 'Frontend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000102', 'Tailwind CSS', 'Frontend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000103', 'HTML5 / CSS3', 'Frontend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000104', 'JavaScript / React', 'Frontend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000105', 'Laravel', 'Backend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000106', 'PHP', 'Backend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000107', 'phpMyAdmin / MySQL', 'Backend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000108', 'RESTful API', 'Backend', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000109', 'Figma (UI/UX Design)', 'Tools', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000110', 'Git / GitHub', 'Tools', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000111', 'OBS Studio', 'Tools', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000112', 'Kerja Tim', 'Soft Skills', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000113', 'Kepemimpinan', 'Soft Skills', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000114', 'Manajemen Waktu', 'Soft Skills', '2026-01-01T00:00:00.000Z'),
  ('00000000-0000-4000-8000-000000000115', 'Komunikasi', 'Soft Skills', '2026-01-01T00:00:00.000Z')
on conflict (id) do update
set name = excluded.name,
    category = excluded.category,
    created_at = excluded.created_at;
