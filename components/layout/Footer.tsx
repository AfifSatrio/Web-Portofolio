"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black border-t border-mono-700 py-12 px-6 md:px-16 text-mono-500 font-sans">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-archivo text-xl font-black text-white tracking-tighter uppercase">
            PORTFOLIO<span className="text-mono-500">.</span>
          </span>
          <p className="text-xs text-mono-500">
            Crafted with Next.js &amp; Strict Monochrome Dark Mode Design System.
          </p>
        </div>

        <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-mono-300">
          <Link href="#hero" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">
            Admin
          </Link>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-white border border-mono-700 px-4 py-2 rounded-[4px] hover:bg-white hover:text-black transition-all"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-container mx-auto text-center mt-8 pt-6 border-t border-mono-900 text-xs text-mono-500">
        © {new Date().getFullYear()} Personal Portfolio. All rights reserved.
      </div>
    </footer>
  );
};
