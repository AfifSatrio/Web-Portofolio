"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "HOME", href: "#hero" },
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "SKILLS", href: "#skills" },
  { name: "CONTACT", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-mono-700 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-container mx-auto px-6 md:px-16 flex items-center justify-between">
          <Link
            href="#hero"
            className="font-archivo text-xl md:text-2xl font-black uppercase tracking-tighter text-white hover:opacity-80 transition-opacity"
          >
            PORTFOLIO<span className="text-mono-500">.</span>
          </Link>

          {/* Universal Hamburger Menu Button (Desktop & Mobile) */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            className="flex items-center gap-3 px-4 py-2 border-2 border-white bg-black text-white hover:bg-white hover:text-black transition-all duration-200 uppercase font-sans text-xs md:text-sm font-bold tracking-wider rounded-[4px] group"
          >
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
            {isOpen ? (
              <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Menu (Strict Monochrome Invert Style) */}
      <div
        className={`fixed inset-0 z-40 bg-black text-white flex flex-col justify-between px-6 py-12 md:px-24 md:py-16 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        {/* Background Accent Grid / Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Top spacer */}
        <div className="h-16" />

        {/* Main Navigation Links */}
        <nav className="max-w-container mx-auto w-full flex flex-col gap-6 md:gap-8 z-10">
          <span className="text-mono-500 font-sans text-xs uppercase tracking-widest border-b border-mono-700 pb-2 max-w-xs">
            // NAVIGATION MENU
          </span>
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-baseline gap-4 md:gap-8 transition-transform duration-300 hover:translate-x-4"
            >
              <span className="font-sans text-xs md:text-sm text-mono-500 font-semibold">
                0{idx + 1}
              </span>
              <span className="font-archivo text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight hover:text-mono-300 transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Overlay Footer Info */}
        <div className="max-w-container mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-mono-700 pt-6 gap-4 text-xs text-mono-500 font-sans z-10">
          <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:text-white transition-colors uppercase font-medium">
              [ ADMIN LOGIN ]
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
