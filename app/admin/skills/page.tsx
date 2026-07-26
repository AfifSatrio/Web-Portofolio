"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Plus, Trash2, Save } from "lucide-react";
import { Skill } from "@/types";
import { DUMMY_SKILLS } from "@/lib/dummy-data";
import { adminFetch } from "@/lib/admin-api";
import { notifyContentRefresh } from "@/lib/content-refresh";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(DUMMY_SKILLS);
  const [newSkillName, setNewSkillName] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await adminFetch<{ skills: Skill[] }>("/api/admin/skills");
      if (data.skills.length > 0) {
        setSkills(data.skills);
      }
    } catch (err) {
      console.log("Using local skills fallback:", err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: "sk-" + Date.now(),
      name: newSkillName.trim(),
      category: newCategory,
      created_at: new Date().toISOString(),
    };

    try {
      const data = await adminFetch<{ skill: Skill }>("/api/admin/skills", {
        method: "POST",
        body: JSON.stringify(newSkill),
      });
      setSkills([...skills, data.skill]);
      setNewSkillName("");
      notifyContentRefresh();
    } catch (err) {
      console.log("Supabase insert error:", err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await adminFetch<null>(`/api/admin/skills/${id}`, { method: "DELETE" });
      setSkills(skills.filter((s) => s.id !== id));
      notifyContentRefresh();
    } catch (err) {
      console.log("Supabase delete error:", err);
    }
  };

  const categories = ["Frontend", "Backend", "Tools", "Soft Skills"];

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="border-b border-mono-700 pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">
          {"// MANAGE SKILLS"}
        </span>
        <h1 className="font-archivo text-3xl font-black uppercase text-white tracking-tight mt-1">
          KELOLA KEAHLIAN &amp; STACK
        </h1>
      </div>

      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} className="bg-mono-900 border border-mono-700 p-6 rounded-[6px] flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            label="Nama Skill / Framework *"
            placeholder="e.g. Next.js, Docker, Figma"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />
        </div>

        <div className="w-full md:w-48">
          <label className="text-xs font-semibold uppercase tracking-wider text-mono-300 block mb-2">
            Kategori *
          </label>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full bg-mono-900 border border-mono-700 text-white rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:border-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full md:w-auto gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          <span>TAMBAH SKILL</span>
        </Button>
      </form>

      {/* Skills Grouped by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          return (
            <Card key={cat} hoverEffect={false} className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-mono-700 pb-3">
                <h3 className="font-archivo text-lg font-bold uppercase text-white">{cat}</h3>
                <span className="text-xs text-mono-500 font-mono">0{catSkills.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <div key={skill.id} className="group inline-flex items-center gap-1.5 bg-black border border-mono-700 rounded-full px-3 py-1.5 text-xs text-mono-300 hover:border-white">
                    <span>{skill.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-mono-500 hover:text-white transition-colors"
                      title="Hapus skill"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
