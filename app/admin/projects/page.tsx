"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { Project } from "@/types";
import { DUMMY_PROJECTS } from "@/lib/dummy-data";
import { adminFetch } from "@/lib/admin-api";
import { notifyContentRefresh } from "@/lib/content-refresh";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await adminFetch<{ projects: Project[] }>("/api/admin/projects");

      if (data.projects.length > 0) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.log("Error fetching from Supabase, using local state:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;

    try {
      await adminFetch<null>(`/api/admin/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== id));
      notifyContentRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-700 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-mono-500">
            {"// MANAGE CONTENT"}
          </span>
          <h1 className="font-archivo text-3xl font-black uppercase text-white tracking-tight mt-1">
            DAFTAR PROYEK
          </h1>
        </div>

        <Link href="/admin/projects/new">
          <Button variant="primary" size="md" className="gap-2">
            <Plus className="w-4 h-4" />
            <span>TAMBAH PROYEK</span>
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center text-mono-500 text-xs uppercase tracking-widest">
          MEMUAT DAFTAR PROYEK...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Card key={project.id} hoverEffect={false} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Image
                  src={project.thumbnail_url}
                  alt={project.title}
                  width={96}
                  height={64}
                  unoptimized
                  className="w-24 h-16 object-cover border border-mono-700 rounded-[4px] bg-mono-900 shrink-0"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-archivo text-xl font-bold uppercase text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-mono-500 line-clamp-1 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech} className="text-[10px] py-0.5 px-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>EDIT</span>
                  </Button>
                </Link>

                <Button
                  onClick={() => handleDelete(project.id)}
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs text-mono-500 hover:text-white hover:bg-mono-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>HAPUS</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
