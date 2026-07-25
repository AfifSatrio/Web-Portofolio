# PRD: Website Portofolio Pribadi

## 1. Overview
Website portofolio pribadi untuk menampilkan profil, keahlian, dan proyek yang telah dikerjakan, dengan tujuan utama mendukung pencarian kerja/magang. Website akan dibangun menggunakan Antigravity.

## 2. Tujuan (Goals)
- Menampilkan profil profesional yang meyakinkan bagi recruiter/HR
- Menonjolkan proyek dan skill teknis secara terstruktur
- Memudahkan recruiter/klien untuk menghubungi pemilik portofolio
- Meningkatkan personal branding di dunia kerja

## 3. Target Audience
- Recruiter / HR perusahaan
- Hiring manager teknis
- Sesama profesional/komunitas (secondary)

## 4. Scope & Fitur

### 4.1 Home / Hero Section
- Nama & tagline singkat (contoh: "Frontend Developer | Passionate about Clean UI")
- **3D model komputer interaktif** dengan scroll animation (lihat spesifikasi detail di Technical Requirements 6.6)
- CTA button: "Lihat Proyek" & "Hubungi Saya"
- Ringkasan singkat 1-2 kalimat tentang diri

### 4.2 About Me
- Deskripsi diri lebih lengkap (latar belakang, pendidikan, minat)
- Value proposition: kenapa recruiter harus mempertimbangkan kamu
- Link download CV (opsional tapi direkomendasikan untuk tujuan cari kerja)

### 4.3 Projects / Portfolio
- Grid/list kartu proyek (tanpa halaman detail terpisah — semua info cukup ditampilkan langsung di card), masing-masing berisi:
  - Judul proyek
  - Thumbnail/screenshot
  - Deskripsi singkat (masalah yang diselesaikan, peran kamu)
  - Tech stack yang digunakan (badge/tag)
  - Link demo & link source code (GitHub) — klik langsung mengarah ke project aslinya
- Bisa dikelompokkan berdasarkan kategori (Web, Mobile, Data, dll) jika relevan

### 4.4 Skills
- Daftar hard skill (bahasa pemrograman, framework, tools)
- Opsional: soft skill (komunikasi, teamwork, problem solving)
- Bisa ditampilkan dalam bentuk badge/tag atau progress indicator sederhana

### 4.5 Contact Form
- Form dengan field: Nama, Email, Pesan
- Alternatif kontak: email langsung, LinkedIn, GitHub
- Validasi input dasar (required fields, format email)

### 4.6 Admin Dashboard (Private, Whitelisted Access Only)
- **Login Page** (`/admin/login`) — autentikasi via Firebase Auth dengan **Google Sign-In**
- **Whitelist Guard** — setelah login berhasil, email dicek terhadap daftar whitelist. Kalau tidak terdaftar, akses ditolak & user di-sign out otomatis
- **Dashboard Home** — ringkasan singkat (jumlah project, last updated, quick links)
- **Manage Projects (CRUD)** — tambah/edit/hapus project: judul, deskripsi, thumbnail, tech stack, link demo, link repo, urutan tampil
- **Manage Skills (CRUD)** — tambah/edit/hapus skill & kategori
- **Manage About Content** — edit bio, tagline, link CV
- **Logout**

> Tujuan fitur ini: supaya konten portofolio (project, skill, bio) bisa diupdate tanpa perlu redeploy/ubah source code.

## 5. Design System

### 5.1 Konsep Visual
Minimalis, monokrom, dan tegas (bold). Kontras tinggi antara hitam & putih dipakai untuk menciptakan hierarki visual yang kuat tanpa bergantung pada warna. Whitespace generous, grid rapi, dan tipografi jadi elemen utama yang "berbicara".

### 5.2 Color Palette (Strict Monochrome, Dark Mode Only)

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--color-black` | `#0A0A0A` | Background utama website |
| `--color-white` | `#FFFFFF` | Teks utama, elemen dengan kontras tertinggi (heading, CTA text) |
| `--color-gray-900` | `#1A1A1A` | Section background alternatif, card background |
| `--color-gray-700` | `#333333` | Border, divider |
| `--color-gray-500` | `#7A7A7A` | Teks sekunder, caption, placeholder, meta info |
| `--color-gray-300` | `#B3B3B3` | Teks tersier/disabled state |

> Tidak ada mode terang dan tidak ada warna ketiga sama sekali. Semua state (hover, active, disabled, success/error) diekspresikan lewat variasi grayscale, ketebalan font, atau invert warna (hitam↔putih) — bukan lewat warna baru. Ini menjaga konsistensi tema yang benar-benar monokrom di seluruh halaman.

### 5.3 Typography

**Font:**
- Heading / Display: **Archivo Black** (via Google Fonts)
- Body / UI text: **General Sans** (via Fontshare)

**Type Scale (contoh, base 16px):**

| Level | Font | Size | Weight | Line-height | Penggunaan |
|-------|------|------|--------|-------------|------------|
| Display | Archivo Black | 64-96px (responsive) | 900 | 1.05 | Hero title |
| H1 | Archivo Black | 40-48px | 900 | 1.1 | Judul section |
| H2 | Archivo Black | 28-32px | 900 | 1.15 | Sub-judul, judul card project |
| H3 | General Sans | 20-22px | 600 | 1.3 | Judul kecil, nama skill category |
| Body | General Sans | 16-18px | 400 | 1.6 | Paragraf, deskripsi |
| Small/Caption | General Sans | 13-14px | 400-500 | 1.4 | Label, meta info, footer |
| Button/CTA | General Sans | 16px | 600 | 1 | Teks tombol (uppercase optional untuk kesan tegas) |

**Catatan penggunaan:**
- Archivo Black sangat bold secara default → pakai HANYA untuk heading/display, jangan untuk body (terlalu berat & kurang nyaman dibaca panjang)
- General Sans punya banyak weight (400-700), manfaatkan variasi weight-nya untuk hierarki di dalam body text tanpa ganti font
- Letter-spacing sedikit negatif (-1% s/d -2%) di heading besar akan memperkuat kesan "tegas" ala Archivo Black

### 5.4 Spacing & Layout
- Base unit: **8px** (spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 128)
- Max content width: 1200-1280px, dengan padding horizontal 24px (mobile) - 80px (desktop)
- Grid: 12-column grid untuk desktop, stack single column untuk mobile
- Section padding vertikal: 80-120px (desktop), 48-64px (mobile) — biar terasa lega dan premium

### 5.5 Komponen Dasar
- **Navbar:** menggunakan **hamburger menu** untuk semua breakpoint (bukan hanya mobile) — konsisten dengan gaya minimalis & tegas, membuka full-screen overlay menu saat diklik, dengan animasi invert warna (hitam↔putih) khas tema
- **Button:** kotak/tajam (sharp corner atau radius kecil 4-6px), border putih tebal 2px untuk outline style, full putih solid (teks hitam) untuk primary CTA — kontras maksimal di atas background hitam
- **Card (project):** border tipis atau shadow minimal, hover effect: invert warna (dari putih→hitam atau sebaliknya) atau scale sedikit
- **Divider:** garis solid tipis 1px, bukan gradient
- **Icon:** gunakan icon set line-style yang konsisten (misal Lucide/Phosphor), monokrom mengikuti tema
- **Cursor/hover state:** karena tema bold, bisa eksplorasi custom cursor atau underline animation di link

### 5.6 Motion/Interaksi (ringan, opsional)
- Fade-in + slide-up sedikit saat section masuk viewport
- Hover invert (black↔white) di card/button untuk kesan "punchy"
- Transisi halus 200-300ms, easing `ease-out`

### 5.7 Responsiveness
- Breakpoints disarankan: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- Fully responsive (mobile, tablet, desktop)
- Konsisten dalam spacing, warna, dan komponen di seluruh halaman

## 6. Technical Requirements
- Dibangun menggunakan **Antigravity**
- Struktur: multi-page dengan route terpisah untuk halaman publik dan admin (`/admin/*`)
- **Autentikasi:** Firebase Authentication dengan **Google Sign-In**, dengan mekanisme whitelist berbasis environment variable (`ADMIN_WHITELIST_EMAILS`) — hanya email yang terdaftar yang bisa mengakses `/admin/*`. Karena admin hanya 1 orang, pendekatan env variable dianggap cukup dan tidak perlu tabel whitelist terpisah
- **Database:** Supabase (Postgres) untuk menyimpan data dinamis: projects, skills, about content
- **Storage:** Supabase Storage (atau Firebase Storage) untuk upload gambar/thumbnail project
- **Route Protection:** middleware untuk verifikasi status login & whitelist sebelum user bisa akses halaman admin
- Hosting/deployment: disarankan Vercel/Netlify (perlu support environment variables untuk Firebase & Supabase config)
- Form kontak (publik): integrasi dengan email service (misal Formspree, EmailJS) — terpisah dari sistem admin
- Optimasi dasar: fast loading, SEO meta tags dasar (title, description)

### 6.6 3D Hero Model — Spesifikasi Teknis

**Library:**
- `@react-three/fiber` — render scene 3D di dalam React/Next.js
- `@react-three/drei` — helper untuk model, kontrol, dan komponen `<Html>`
- `@react-three/drei` `<ScrollControls>` + `useScroll` — untuk mengikat animasi 3D ke scroll posisi user (pilihan utama, karena sudah satu ekosistem dengan React Three Fiber, tanpa perlu library animasi tambahan)
- Alternatif kalau butuh kontrol timeline yang lebih presisi: **GSAP + ScrollTrigger**, dikombinasikan dengan Three.js scene

**Konsep Model:**
- Model komputer/monitor dibangun dari primitive shapes (`<RoundedBox>`, `<mesh>`) — bukan file `.glb` eksternal, supaya ringan & warnanya konsisten monokrom (hitam solid untuk body, aksen putih tipis untuk outline/detail)
- "Layar" komputer menggunakan `<Html transform occlude>` dari drei, berisi konten HTML asli (bukan texture gambar statis):
  - Foto profil (kiri layar)
  - Nama & role (misal "Nama — Frontend Developer")
  - Link sosial media: LinkedIn & Instagram (ikon + link, clickable)

**Scroll Animation:**
- Saat halaman pertama dimuat, model komputer muncul dengan animasi masuk (fade + slide/rotate ringan)
- Seiring user scroll di section Hero, model bereaksi — misal berputar sedikit di axis Y, berubah posisi/scale, atau kamera bergeser — memberi kesan interaktif & "hidup"
- Animasi scroll dibatasi hanya di dalam viewport Hero section (tidak terus jalan di seluruh halaman), supaya performa tetap terjaga

**Performa & Fallback:**
- Component 3D di-load secara dynamic import dengan `ssr: false` (Next.js) supaya tidak membebani initial load/SSR
- Sediakan fallback (gambar statis foto "komputer" atau skeleton loader) selama model sedang di-load atau untuk device yang tidak support WebGL
- Pertimbangkan menonaktifkan/menyederhanakan animasi 3D di layar kecil (mobile) demi performa, kalau diperlukan bisa diganti versi statis di breakpoint mobile

## 7. Content Checklist (yang perlu disiapkan sebelum development)
- [ ] Foto profil
- [ ] CV/resume (PDF)
- [ ] Daftar minimal 3-5 proyek terbaik beserta deskripsi & screenshot
- [ ] Daftar skill teknis
- [ ] Link sosial media/profesional (LinkedIn, GitHub, dll)
- [ ] Copywriting untuk tagline & deskripsi diri

## 8. Success Metrics
- Website dapat diakses dengan baik di berbagai device
- Waktu loading halaman cepat (< 3 detik)
- Recruiter dapat dengan mudah menemukan cara menghubungi & melihat proyek
- Form kontak berfungsi dan pesan diterima dengan baik

## 9. Out of Scope (untuk versi awal)
- Blog/artikel (bisa ditambahkan di iterasi berikutnya)
- Multi-language support
- Role/permission bertingkat di admin (misal admin vs editor) — untuk awal cukup 1 level akses (whitelisted admin)
- Analytics/statistik pengunjung built-in

## 10. Timeline (draft, sesuaikan kebutuhan)
| Fase | Deskripsi | Estimasi |
|------|-----------|----------|
| 1 | Kumpulkan konten & referensi desain | 2-3 hari |
| 2 | Setup project di Antigravity, konfigurasi Firebase & Supabase | 1-2 hari |
| 3 | Development halaman publik (Home, About, Projects, Skills, Contact) | 3-5 hari |
| 4 | Development Admin Dashboard (auth, CRUD projects/skills/about) | 3-4 hari |
| 5 | Styling & responsivitas | 2-3 hari |
| 6 | Testing & deploy | 1-2 hari |

## 11. Struktur Proyek (Development Breakdown)

> Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**

### 11.1 Folder Structure

```
portfolio-website/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Home / Hero
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx        # Grid project, link langsung ke project asli (no detail page)
│   │   ├── skills/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx           # Firebase Auth login
│   │   ├── layout.tsx               # Wrapper: cek auth + whitelist
│   │   ├── dashboard/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx             # List + delete
│   │   │   ├── new/page.tsx         # Create
│   │   │   └── [id]/edit/page.tsx   # Update
│   │   ├── skills/page.tsx
│   │   └── about/page.tsx
│   ├── api/
│   │   └── contact/route.ts         # Handler form kontak publik
│   ├── layout.tsx                   # Root layout (font, theme)
│   └── globals.css
├── components/
│   ├── ui/                          # Button, Card, Input, Badge (design system)
│   ├── layout/                      # Navbar (hamburger menu), Footer
│   ├── sections/                    # Hero, ProjectCard, SkillBadge, dll
│   ├── three/                       # ComputerModel, HeroScene, ScrollRig (komponen 3D)
│   └── admin/                       # Sidebar, DataTable, AdminForm
├── lib/
│   ├── firebase.ts                  # Init Firebase app & auth
│   ├── supabase.ts                  # Init Supabase client
│   ├── auth-whitelist.ts            # Logic cek email vs whitelist
│   └── utils.ts
├── middleware.ts                    # Proteksi route /admin/*
├── types/
│   └── index.ts                     # Type: Project, Skill, AboutContent
├── public/
├── .env.local                       # Firebase & Supabase keys (jangan commit)
└── package.json
```

### 11.2 Skema Database (Supabase / Postgres)

**Table: `projects`**
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid (PK) | |
| title | text | |
| description | text | |
| thumbnail_url | text | |
| tech_stack | text[] | |
| demo_url | text | nullable |
| repo_url | text | nullable |
| display_order | int | untuk urutan tampil |
| created_at | timestamp | |

**Table: `skills`**
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid (PK) | |
| name | text | |
| category | text | e.g. "Frontend", "Tools" |
| created_at | timestamp | |

**Table: `about_content`**
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid (PK) | biasanya 1 row saja |
| bio | text | |
| tagline | text | |
| cv_url | text | |
| updated_at | timestamp | |

**Whitelist admin:** disimpan sebagai environment variable `ADMIN_WHITELIST_EMAILS` (comma-separated). Karena admin hanya 1 orang, tidak perlu tabel khusus di Supabase — cukup dicek di sisi server saat proses login.

### 11.3 Alur Autentikasi Admin
1. User membuka `/admin/login`
2. Klik tombol "Sign in with Google" → Firebase Auth handle proses OAuth
3. Setelah berhasil, aplikasi cek email user terhadap daftar di `ADMIN_WHITELIST_EMAILS` (env variable)
4. Jika **terdaftar** → redirect ke `/admin/dashboard`
5. Jika **tidak terdaftar** → tampilkan pesan "Akun tidak memiliki akses" + auto sign-out
6. `middleware.ts` memverifikasi status login pada setiap request ke `/admin/*`, redirect ke `/admin/login` kalau belum authenticated

### 11.4 Pembagian Tanggung Jawab (Firebase vs Supabase)
- **Firebase** → hanya untuk autentikasi (siapa yang boleh login)
- **Supabase** → penyimpanan seluruh data konten (projects, skills, about) + storage untuk gambar
- Kedua service ini independen; data user/auth tidak perlu disinkronkan ke Supabase kecuali kamu mau menyimpan log aktivitas admin (opsional, out of scope untuk versi awal)
