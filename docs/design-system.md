# Tampilan dan perilaku website

Panduan mengubah isi dan peta file ada di [README](../README.md).

## Layout dan style

Website memakai warna monokrom, font sistem, garis tipis, dan jarak yang lapang.
`app/globals.css` mengatur dasar bersama; CSS tampilan dibagi menjadi
`styles/layout.css`, `styles/home.css`, dan `styles/projects.css`.

Container maksimal 1200 px, dengan padding 20 px pada mobile, 32 px mulai 640 px,
dan 48 px mulai 1024 px. Menu desktop muncul mulai 768 px. Focus keyboard selalu
terlihat dan tombol navigasi serta ikon sosial memiliki area sentuh minimal 44 px.

## Section dan animasi

`app/page.tsx` menyusun About, Projects, dan Contact. Setiap section memakai
`StackedSection`: permukaan sticky, urutan z-index, dan marker dalam alur halaman
membuat section berikutnya menutupi section sebelumnya. Background bergantian
antara `#0c0c0c` dan `#111111`, dengan garis pembatas di atas section berikutnya.

Section yang tinggi bisa digulir sampai bawah sebelum menempel. ResizeObserver
menghitung ulang posisi saat ukuran konten atau viewport berubah. Keyboard focus
memunculkan kembali kontrol yang tertutup section lain. Efek gelap maksimal 8%.
`ScrollReveal` mengatur animasi muncul; konten server tetap terbaca sebelum
JavaScript siap dan ketika JavaScript dimatikan.

`SiteLayout` memakai `MotionConfig` untuk menghormati reduced motion. CSS juga
menonaktifkan transisi dan smooth scroll pada preferensi tersebut. Section
kembali ke alur dokumen biasa tanpa efek tumpukan.

Menu mobile memakai dialog native, penguncian scroll, focus containment, Escape
untuk menutup, dan pengembalian focus ke tombol pembuka.

## Data dan route

Semua isi utama berasal dari `content/`; tidak ada pengambilan data saat runtime.
Halaman utama dan detail proyek dihasilkan saat build. Urutan array proyek adalah
urutan tampil; ID proyek menjaga URL lama tetap bisa dibuka.

## Cek visual setelah mengubah layout

Periksa lebar 320, 390, 768, dan 1440 px; pastikan tidak ada overflow horizontal.
Cek menu mobile, navigasi keyboard, tautan section, tumpukan section termasuk
section panjang, halaman detail dan 404, reduced motion, serta halaman tanpa
JavaScript. Jalankan `npm run check` sebelum publish.
