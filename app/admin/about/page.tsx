"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Save, CheckCircle2 } from "lucide-react";
import { DUMMY_ABOUT } from "@/lib/dummy-data";
import { supabase } from "@/lib/supabase";

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    tagline: DUMMY_ABOUT.tagline,
    bio: DUMMY_ABOUT.bio,
    cv_url: DUMMY_ABOUT.cv_url || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    async function loadAbout() {
      try {
        const { data, error } = await supabase.from("about_content").select("*").limit(1).single();
        if (!error && data) {
          setFormData({
            tagline: data.tagline || "",
            bio: data.bio || "",
            cv_url: data.cv_url || "",
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
      await supabase.from("about_content").upsert([
        {
          id: DUMMY_ABOUT.id,
          tagline: formData.tagline,
          bio: formData.bio,
          cv_url: formData.cv_url || null,
          updated_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.log("Supabase about update error:", err);
    }

    setIsSubmitting(false);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="border-b border-mono-700 pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">// EDIT PROFILE</span>
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
