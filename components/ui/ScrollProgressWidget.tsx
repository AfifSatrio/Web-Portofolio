"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollProgressWidget = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 transition-all duration-300 ${isVisible
        ? "opacity-100 translate-x-0 pointer-events-auto"
        : "opacity-0 translate-x-4 pointer-events-none"
        }`}
    >
      {/* Vertical Scroll Progress Bar Track */}
      <div className="w-[4px] h-44 bg-mono-800 rounded-full overflow-hidden relative">
        <div
          className="w-full bg-white rounded-full transition-all duration-150 ease-out absolute bottom-0"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to Top Arrow Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to Top"
        className="w-8 h-8 flex items-center justify-center bg-mono-900/80 border border-mono-700 text-white hover:bg-white hover:text-black hover:border-white active:scale-90 transition-all duration-200 rounded-full backdrop-blur-sm group"
      >
        <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
