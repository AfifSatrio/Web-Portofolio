"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { notifyContentRefresh } from "@/lib/content-refresh";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    tech_stack: "",
    demo_url: "",
    repo_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const techArray = formData.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      thumbnail_url: formData.thumbnail_url || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
      tech_stack: techArray,
      demo_url: formData.demo_url || null,
      repo_url: formData.repo_url || null,
      created_at: new Date().toISOString(),
    };

    try {
      await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      notifyContentRefresh();
      router.push("/admin/projects");
    } catch (err) {
      console.log("Supabase insert error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-3xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-mono-500 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Proyek</span>
      </Link>

      <div className="border-b border-mono-700 pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">
          {"// CREATE NEW"}
        </span>
        <h1 className="font-archivo text-2xl md:text-3xl font-black uppercase text-white tracking-tight mt-1">
          TAMBAH PROYEK BARU
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-mono-900 border border-mono-700 p-4 md:p-8 rounded-card flex flex-col gap-6">
        <Input
          label="Judul Proyek *"
          placeholder="e.g. E-Commerce Dashboard"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Textarea
          label="Deskripsi Proyek *"
          placeholder="Jelaskan secara singkat masalah yang diselesaikan dan peran Anda..."
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <ImageUpload
          label="Thumbnail / Screenshot Proyek *"
          value={formData.thumbnail_url}
          onChange={(url) => setFormData({ ...formData, thumbnail_url: url })}
        />

        <Input
          label="Tech Stack (Pisahkan dengan koma) *"
          placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
          required
          value={formData.tech_stack}
          onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="URL Live Demo (Opsional)"
            placeholder="https://my-demo.com"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
          />

          <Input
            label="URL Repository GitHub (Opsional)"
            placeholder="https://github.com/user/repo"
            value={formData.repo_url}
            onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 mt-4"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? "MENYIMPAN..." : "SIMPAN PROYEK"}</span>
        </Button>
      </form>
    </div>
  );
}
