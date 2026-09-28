# Portfolio Afif Satrio

Website portfolio berbasis Next.js, TypeScript, Tailwind CSS, dan Framer Motion.
Isi website berasal dari file lokal di `content/`. Tidak perlu dashboard, akun
Firebase, Supabase, atau file `.env` untuk menjalankan dan membangun website.

## Mulai menjalankan

Gunakan Node.js 20 atau lebih baru dan **npm**. `package-lock.json` adalah satu-satunya lockfile.

```sh
npm ci
npm run dev
```

Buka `http://localhost:3000`. Perubahan file akan langsung terlihat di development.
Untuk website yang sudah dipublikasikan, commit perubahan lalu deploy ulang.

## Mau mengubah apa?

| Yang diubah | File |
| --- | --- |
| Nama, logo teks, email, media sosial, menu, judul SEO | `content/site.ts` |
| Sapaan, headline, bio, judul section, teks kontak | `content/home.ts` |
| Judul, deskripsi, teknologi, link, dan urutan proyek | `content/projects.ts` |
| Urutan section di homepage | `app/page.tsx` |
| Susunan bagian About | `components/sections/AboutSection.tsx` |
| Susunan daftar proyek | `components/sections/ProjectsSection.tsx` |
| Susunan bagian Contact | `components/sections/ContactSection.tsx` |
| Tampilan satu baris proyek | `components/projects/ProjectCard.tsx` |
| Isi dan susunan halaman detail proyek | `app/projects/[id]/page.tsx` |
| Header/menu dan footer | `components/layout/Navbar.tsx`, `Footer.tsx` |
| Font, warna dasar, container, focus, scrollbar | `app/globals.css` |
| Header, menu mobile, footer, tombol/link bersama | `styles/layout.css` |
| About, Contact, jarak section, efek section bertumpuk | `styles/home.css` |
| Daftar proyek dan halaman detailnya | `styles/projects.css` |
| Animasi muncul saat scroll | `components/ui/ScrollReveal.tsx` |
| Perilaku section bertumpuk saat scroll | `components/ui/StackedSection.tsx` |
| Halaman 404 | `app/not-found.tsx` |
| Favicon dan ikon perangkat | `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` |

## Mengedit isi

Ubah teks di antara tanda kutip pada file `content/`. Gunakan `\n\n` untuk
memisahkan paragraf dalam deskripsi proyek. Email pada `site.ts` dipakai bersama
oleh tombol kontak di header, About, Contact, dan halaman detail proyek.

Setiap profil sosial memiliki `label`, `url`, `handle`, dan `icon`. Ikon yang
tersedia: `github`, `linkedin`, `instagram`. Untuk menambah jenis ikon, tambahkan
juga pemetaannya di `AboutSection.tsx` dan daftar validasinya di
`scripts/check-content.mjs`.

## Menambah atau mengurutkan proyek

Tambahkan objek ke array `projects` dalam `content/projects.ts`:

```ts
{
  id: "nama-proyek-baru",
  title: "Nama Proyek",
  description: "Penjelasan proyek yang kamu kerjakan.",
  techStack: ["Next.js", "Tailwind CSS"],
  websiteUrl: "https://example.com",
  // sourceUrl: "https://github.com/username/repo",
},
```

- Urutan objek di file adalah urutan tampil di homepage.
- `id` harus unik dan hanya memakai huruf, angka, `-`, atau `_`.
- Jangan mengubah ID proyek lama: URL detail yang sudah dibagikan memakai ID itu.
- `websiteUrl` dan `sourceUrl` opsional; hapus field jika tidak ada link.
- `techStack` boleh berupa array kosong `[]`.
- Halaman `/projects/<id>` dan judul SEO-nya dibuat otomatis saat build.

## Struktur singkat

```text
app/                  Route, layout utama, CSS global, dan ikon
components/
  layout/             Header, footer, pembungkus website
  sections/           About, Projects, Contact
  projects/           Komponen baris proyek
  ui/                 Animasi yang digunakan bersama
content/              Semua isi utama yang biasa diedit
styles/               CSS berdasarkan bagian website
scripts/              Pemeriksaan kesalahan isi
```

URL lama `/about`, `/projects`, dan `/contact` tetap diarahkan ke section homepage.
Halaman detail mempertahankan ID dan URL proyek sebelumnya.

## Pemeriksaan sebelum publish

```sh
npm run check
```

Perintah ini menjalankan lint, validasi konten (termasuk ID ganda dan format link),
dan production build yang juga memeriksa TypeScript. Validasi link memeriksa
formatnya, bukan ketersediaan website tujuan.

Untuk melihat hasil production:

```sh
npm run build
npm start
```

Jika development server masih aktif, gunakan direktori build terpisah:

```sh
PORTFOLIO_BUILD_DIR=.next-qa npm run build
PORTFOLIO_BUILD_DIR=.next-qa npx next start -p 3001
```

Detail perilaku layout dan aksesibilitas ada di [docs/design-system.md](docs/design-system.md).
