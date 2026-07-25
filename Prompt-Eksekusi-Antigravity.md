# Prompt Eksekusi untuk Antigravity

Gunakan prompt ini di Antigravity. Lampirkan/paste file `PRD-Website-Portofolio.md` bersamaan dengan prompt ini (atau paste isinya langsung sebelum prompt di bawah).

---

Saya ingin membangun website portofolio pribadi. Saya sudah punya PRD (Product Requirements Document) lengkap yang terlampir — tolong gunakan itu sebagai acuan utama untuk seluruh keputusan produk, desain, dan teknis. Jangan menyimpang dari keputusan yang sudah ditetapkan di PRD (misalnya: strict monochrome dark mode, font Archivo Black + General Sans, navbar hamburger, Firebase Auth untuk admin, Supabase untuk database) kecuali saya minta diubah.

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS

**Kerjakan secara bertahap, jangan langsung generate semuanya sekaligus.** Ikuti urutan berikut, dan tunggu konfirmasi saya di setiap akhir fase sebelum lanjut ke fase berikutnya:

## Fase 1 — Setup Project
- Inisialisasi project Next.js + TypeScript + Tailwind sesuai struktur folder di PRD section 11.1
- Setup konfigurasi font (Archivo Black via Google Fonts, General Sans via Fontshare) di `app/layout.tsx`
- Setup Tailwind config dengan design tokens dari PRD section 5 (color palette, spacing scale, type scale)
- Buat file `.env.example` yang mendaftar semua environment variable yang dibutuhkan (Firebase config + Supabase config + `ADMIN_WHITELIST_EMAILS`)
- Setup koneksi Firebase (`lib/firebase.ts`) dan Supabase (`lib/supabase.ts`) sesuai PRD section 6 dan 11.4

## Fase 2 — Halaman Publik (Static/Dummy Content dulu)
- Bangun komponen dasar di `components/ui/` (Button, Card, Badge, Input) sesuai Design System PRD section 5.5
- Bangun Navbar dengan hamburger menu (full-screen overlay) dan Footer
- Bangun tiap section sesuai PRD section 4.1–4.5: Hero (tanpa 3D dulu, pakai placeholder), About, Projects (grid, tanpa halaman detail), Skills, Contact Form
- Gunakan dummy/placeholder content dulu untuk foto, project, dan skill — data asli akan diisi lewat admin dashboard di fase selanjutnya
- Pastikan fully responsive sesuai breakpoints di PRD section 5.7

## Fase 3 — Admin Dashboard
- Buat halaman login (`/admin/login`) dengan Google Sign-In via Firebase Auth
- Implementasikan whitelist guard dan `middleware.ts` untuk proteksi route `/admin/*` sesuai alur di PRD section 11.3
- Buat Dashboard Home, dan CRUD untuk Projects, Skills, dan About Content sesuai PRD section 4.6 dan skema database di 11.2
- Hubungkan CRUD ini ke Supabase, dan pastikan data yang diubah dari admin langsung reflect ke halaman publik

## Fase 4 — 3D Hero Model
- Install `@react-three/fiber` dan `@react-three/drei`
- Bangun model komputer sederhana dari primitive shapes (monokrom, sesuai PRD section 6.6), bukan file `.glb` eksternal
- Implementasikan "layar" komputer menggunakan `<Html transform occlude>` berisi foto profil, nama, role, dan link LinkedIn/Instagram
- Tambahkan scroll animation yang bereaksi di dalam viewport Hero section (rotate/scale/posisi), dibatasi hanya area Hero
- Load komponen 3D secara dynamic import (`ssr: false`), sediakan fallback untuk device tanpa WebGL/mobile

## Fase 5 — Polish & Deploy
- Review seluruh halaman untuk konsistensi design system (warna, tipografi, spacing)
- Tambahkan SEO meta tags dasar
- Setup deployment ke Vercel dengan environment variables
- Testing responsivitas dan performa loading

---

**Instruksi tambahan:**
- Di setiap fase, jelaskan singkat file/komponen apa saja yang dibuat sebelum lanjut
- Kalau ada keputusan teknis yang belum jelas di PRD, tanyakan ke saya dulu daripada berasumsi
- Prioritaskan kode yang clean dan reusable, karena portofolio ini kemungkinan akan terus di-maintain jangka panjang
