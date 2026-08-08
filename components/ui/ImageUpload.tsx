"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ label, value, onChange, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Sesi admin belum tersedia.");

        const token = await user.getIdToken();
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload gagal.");
        }

        setPreview(data.url);
        onChange(data.url);
      } catch (err: any) {
        setError(err.message || "Upload gagal.");
        setPreview(value || null);
      } finally {
        setIsUploading(false);
        URL.revokeObjectURL(localPreview);
      }
    },
    [onChange, value]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    },
    [uploadFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        uploadFile(file);
      } else {
        setError("File harus berupa gambar (PNG, JPG, GIF, WebP).");
      }
    },
    [uploadFile]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange("");
    setError(null);
  }, [onChange]);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-mono-300">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        /* Preview State */
        <div className="relative group rounded-[4px] border border-mono-700 overflow-hidden bg-mono-900">
          <div className="relative w-full aspect-video">
            <Image
              src={preview}
              alt="Thumbnail preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-xs uppercase tracking-widest text-mono-300">
                MENGUPLOAD...
              </span>
            </div>
          )}

          {!isUploading && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-[4px] hover:bg-mono-200 transition-colors"
              >
                GANTI
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-mono-700 text-white rounded-[4px] hover:bg-mono-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Upload State */
        <div
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative w-full aspect-video rounded-[4px] border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-3",
            isDragging
              ? "border-white bg-mono-800"
              : "border-mono-700 bg-mono-900 hover:border-mono-500 hover:bg-mono-800/50"
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-mono-500 animate-spin" />
              <span className="text-xs uppercase tracking-widest text-mono-500">
                MENGUPLOAD...
              </span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-mono-800 border border-mono-700 flex items-center justify-center">
                {isDragging ? (
                  <Upload className="w-5 h-5 text-white" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-mono-500" />
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-mono-300">
                  {isDragging ? "LEPASKAN FILE DI SINI" : "KLIK ATAU DRAG & DROP"}
                </span>
                <span className="text-[10px] text-mono-500">
                  PNG, JPG, GIF, WebP — Maks 5MB
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <span className="text-xs text-red-400 mt-0.5">{error}</span>
      )}
    </div>
  );
}
