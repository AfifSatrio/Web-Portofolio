"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgressWidget() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        })
      }
      className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-control border border-line-strong bg-surface-card text-ink transition-colors duration-ui hover:bg-white hover:text-black"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
