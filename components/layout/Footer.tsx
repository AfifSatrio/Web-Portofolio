"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-12 px-6 md:px-16 text-mono-500 font-sans border-t border-mono-700">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-archivo text-xl font-black text-white tracking-tighter uppercase">
            AFIFSATRIO<span className="text-mono-500">.DEV</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-mono-300 flex-wrap justify-center">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <div className="max-w-container mx-auto text-center mt-8 pt-6 border-t border-mono-900 text-xs text-mono-500">
        © {new Date().getFullYear()} Personal Portfolio. All rights reserved.
      </div>
    </footer>
  );
};
