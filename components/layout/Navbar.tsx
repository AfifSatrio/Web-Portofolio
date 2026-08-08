"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/constants";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-mono-700 py-8"
            : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-container mx-auto px-6 md:px-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-archivo text-xl md:text-2xl font-black uppercase tracking-tighter text-white hover:opacity-80 transition-opacity"
          >
            AFIFSATRIO.DEV<span className="text-mono-500">.</span>
          </Link>

          {/* Icon-Only Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            className="p-2.5 text-white hover:text-mono-400 active:scale-90 transition-all duration-200 group focus:outline-none"
          >
            {isOpen ? (
              <X className="w-7 h-7 transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black text-white flex flex-col justify-between px-6 pt-24 pb-10 md:px-24 md:pt-28 md:pb-14 transition-all duration-500 ease-in-out ${isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
          }`}
      >
        {/* Background Accent Grid / Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Main Navigation Links */}
        <nav className="max-w-container mx-auto w-full flex flex-col gap-6 md:gap-8 z-10">
          <span className="text-mono-500 font-sans text-xs uppercase tracking-widest border-b border-mono-700 pb-2 max-w-xs">
            {"// NAVIGATION MENU"}
          </span>
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-baseline gap-4 md:gap-8 transition-transform duration-300 hover:translate-x-4"
              >
                <span className="font-sans text-xs md:text-sm text-mono-500 font-semibold">
                  0{idx + 1}
                </span>
                <span
                  className={`font-archivo text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight transition-colors ${isActive ? "text-white underline underline-offset-8" : "text-mono-500 hover:text-white"
                    }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Overlay Footer Info */}
        <div className="max-w-container mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-mono-700 pt-6 gap-4 text-xs text-mono-500 font-sans z-10">
          <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </>
  );
};
