"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Save, CheckCircle2 } from "lucide-react";
import { EMPTY_ABOUT } from "@/lib/content-data";
import { AboutContent } from "@/types";
import { adminFetch } from "@/lib/admin-api";
import { notifyContentRefresh } from "@/lib/content-refresh";

const normalizeMultilineText = (value: string) =>
  value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    tagline: EMPTY_ABOUT.tagline,
    bio: EMPTY_ABOUT.bio,
    cv_url: EMPTY_ABOUT.cv_url || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    async function loadAbout() {
      try {
        const { about } = await adminFetch<{ about: AboutContent | null }>("/api/admin/about");
        if (about) {
          setFormData({
            tagline: about.tagline || "",
            bio: about.bio || "",
            cv_url: about.cv_url || "",
          });
        }
      } catch (err) {
        console.log("Using local about state:", err);
      }
    }
    loadAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminFetch("/api/admin/about", {
        method: "PUT",
        body: JSON.stringify({
          id: EMPTY_ABOUT.id || "00000000-0000-4000-8000-000000000001",
          tagline: formData.tagline.trim(),
          bio: normalizeMultilineText(formData.bio),
          cv_url: formData.cv_url.trim() || null,
          updated_at: new Date().toISOString(),
        }),
      });
      notifyContentRefresh();
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      console.log("Supabase about update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="border-b border-mono-700 pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">
          {"// EDIT PROFILE"}
        </span>
        <h1 className="font-archivo text-3xl font-black uppercase text-white tracking-tight mt-1">
          KELOLA ABOUT &amp; BIO
        </h1>
      </div>

      {successMessage && (
        <div className="p-4 bg-mono-900 border border-white rounded-[4px] flex items-center gap-3 text-xs text-white">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span>Konten Bio &amp; Tagline berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-mono-900 border border-mono-700 p-8 rounded-[6px] flex flex-col gap-6">
        <Input
          label="Tagline Singkat (Hero Section) *"
          placeholder="Frontend Developer | Passionate about Clean UI"
          required
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
        />

        <Textarea
          label="Bio / Deskripsi Lengkap (About Section) *"
          placeholder="Tuliskan latar belakang dan minat profesional Anda..."
          required
          rows={6}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />

        <Input
          label="URL File CV / Resume (PDF) *"
          placeholder="/resume.pdf atau URL publik PDF CV Anda"
          value={formData.cv_url}
          onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 mt-4"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? "MENYIMPAN..." : "SIMPAN PERUBAHAN BIO"}</span>
        </Button>
      </form>
    </div>
  );
}
