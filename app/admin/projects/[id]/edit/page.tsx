"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { ArrowLeft, Save } from "lucide-react";
import { Project } from "@/types";
import { adminFetch } from "@/lib/admin-api";
import { notifyContentRefresh } from "@/lib/content-refresh";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    tech_stack: "",
    demo_url: "",
    repo_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const { project } = await adminFetch<{ project: Project }>(
          `/api/admin/projects/${projectId}`
        );

        if (project) {
          setFormData({
            title: project.title || "",
            description: project.description || "",
            thumbnail_url: project.thumbnail_url || "",
            tech_stack: (project.tech_stack || []).join(", "),
            demo_url: project.demo_url || "",
            repo_url: project.repo_url || "",
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Supabase fetch failed, looking in dummy:", err);
      }

      // No dummy projects fallback needed
      setLoading(false);
    }

    if (projectId) loadProject();
  }, [projectId]);

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
      thumbnail_url: formData.thumbnail_url,
      tech_stack: techArray,
      demo_url: formData.demo_url || null,
      repo_url: formData.repo_url || null,
    };

    try {
      await adminFetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      notifyContentRefresh();
      router.push("/admin/projects");
    } catch (err) {
      console.log("Supabase update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center text-mono-500 text-xs uppercase tracking-widest">
        MEMUAT DATA PROYEK...
      </div>
    );
  }

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
          {"// EDIT ITEM"}
        </span>
        <h1 className="font-archivo text-2xl md:text-3xl font-black uppercase text-white tracking-tight mt-1">
          EDIT PROYEK
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-mono-900 border border-mono-700 p-4 md:p-8 rounded-card flex flex-col gap-6">
        <Input
          label="Judul Proyek *"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Textarea
          label="Deskripsi Proyek *"
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
          required
          value={formData.tech_stack}
          onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="URL Live Demo"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
          />

          <Input
            label="URL Repository GitHub"
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
          <span>{isSubmitting ? "MENYIMPAN..." : "PERBARUI PROYEK"}</span>
        </Button>
      </form>
    </div>
  );
}
