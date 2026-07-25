"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Send, Mail, Linkedin, Github, CheckCircle2 } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = "Nama wajib diisi";
    if (!formData.email.trim()) {
      errs.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Format email tidak valid";
    }
    if (!formData.message.trim()) errs.message = "Pesan wajib diisi";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Information & Social Links */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
              // GET IN TOUCH
            </span>
            <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              HUBUNGI SAYA
            </h2>
            <p className="font-sans text-mono-500 text-base leading-relaxed">
              Tertarik bekerja sama, memiliki pertanyaan seputar proyek, atau sekadar ingin menyapa? Silakan kirim pesan melalui form atau saluran sosial media di bawah.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-mono-700">
            <a
              href="mailto:contact@developer.com"
              className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
            >
              <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-mono-500 uppercase font-sans">Email Direct</span>
                <span className="font-sans text-sm font-semibold">contact@developer.com</span>
              </div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
            >
              <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-mono-500 uppercase font-sans">LinkedIn Profile</span>
                <span className="font-sans text-sm font-semibold">linkedin.com/in/developer</span>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
            >
              <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-mono-500 uppercase font-sans">GitHub Repository</span>
                <span className="font-sans text-sm font-semibold">github.com/developer</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-mono-900 border border-mono-700 p-8 md:p-12 rounded-[6px]">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
              <CheckCircle2 className="w-16 h-16 text-white" />
              <h3 className="font-archivo text-2xl font-black uppercase text-white">
                PESAN TERKIRIM!
              </h3>
              <p className="font-sans text-mono-500 text-sm max-w-md">
                Terima kasih telah menghubungi. Saya akan membaca pesan Anda dan membalasnya secepat mungkin.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitted(false)}
                className="mt-4"
              >
                Kirim Pesan Lain
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h3 className="font-archivo text-2xl font-black uppercase text-white tracking-wide border-b border-mono-700 pb-4">
                KIRIM PESAN
              </h3>

              <Input
                label="Nama Lengkap *"
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />

              <Input
                label="Alamat Email *"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              <Textarea
                label="Pesan *"
                placeholder="Tuliskan pesan atau detail penawaran proyek..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={errors.message}
                rows={5}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full gap-2 mt-2"
              >
                <span>{isSubmitting ? "MENGIRIM..." : "KIRIM PESAN"}</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
