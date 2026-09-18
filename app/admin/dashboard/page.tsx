"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FolderKanban, Wrench, UserCheck, Plus, ExternalLink } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState<number>(0);
  const [skillCount, setSkillCount] = useState<number>(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const data = await adminFetch<{ projectCount: number; skillCount: number }>(
          "/api/admin/dashboard"
        );
        setProjectCount(data.projectCount);
        setSkillCount(data.skillCount);
      } catch (err) {
        console.log("Using fallback counts:", err);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-700 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">
            {"// DASHBOARD OVERVIEW"}
          </span>
          <h1 className="font-archivo text-3xl md:text-4xl font-black uppercase text-white tracking-tight mt-1">
            RINGKASAN PORTFOLIO
          </h1>
        </div>

        <Link href="/admin/projects/new">
          <Button variant="primary" size="md" className="gap-2">
            <Plus className="w-4 h-4" />
            <span>TAMBAH PROYEK BARU</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-mono-500 font-semibold">TOTAL PROYEK</span>
            <FolderKanban className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-archivo text-5xl font-black text-white">{projectCount}</span>
            <span className="text-xs text-mono-500">Proyek terdaftar</span>
          </div>
          <Link href="/admin/projects" className="pt-2">
            <span className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-1 hover:underline">
              <span>Kelola Proyek</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-mono-500 font-semibold">TOTAL SKILLS</span>
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-archivo text-5xl font-black text-white">{skillCount}</span>
            <span className="text-xs text-mono-500">Keahlian aktif</span>
          </div>
          <Link href="/admin/skills" className="pt-2">
            <span className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-1 hover:underline">
              <span>Kelola Skills</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-mono-500 font-semibold">PROFILE &amp; BIO</span>
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-archivo text-2xl font-black text-white">TERUPDATE</span>
            <span className="text-xs text-mono-500">Tagline &amp; CV Aktif</span>
          </div>
          <Link href="/admin/about" className="pt-2">
            <span className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-1 hover:underline">
              <span>Edit Bio &amp; Tagline</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </Link>
        </Card>
      </div>

      <div className="p-6 bg-mono-900 border border-mono-700 rounded-card flex flex-col gap-3">
        <h3 className="font-sans text-lg font-semibold text-ink">
          {"// PETUNJUK PENGGUNAAN ADMIN"}
        </h3>
        <ul className="text-xs text-mono-500 space-y-2 font-sans list-disc list-inside">
          <li>Seluruh perubahan data proyek, skill, dan bio akan langsung tersimpan ke Supabase Database.</li>
          <li>Apabila tabel Supabase belum dibuat, sistem otomatis menggunakan data fallback (dummy) agar website publik tidak blank.</li>
          <li>Pastikan format URL gambar thumbnail (misal Unsplash / Supabase Storage) dapat diakses secara publik.</li>
        </ul>
      </div>
    </div>
  );
}
