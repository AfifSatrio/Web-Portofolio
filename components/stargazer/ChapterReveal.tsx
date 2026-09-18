"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A brief, one-time entrance; content stays visible without JS or with reduced motion. */
export function ChapterReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !element.animate || !("IntersectionObserver" in window))
      return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = stagger
      ? (Array.from(element.children) as HTMLElement[])
      : [element];
    const animations = new Map<Element, Animation>();
    const shown = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (shown.has(entry.target)) return;
          shown.add(entry.target);
          if (reduced.matches || entry.target.contains(document.activeElement))
            return;
          animations.get(entry.target)?.cancel();
          const index = targets.indexOf(entry.target as HTMLElement);
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translate3d(0, 12px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 450,
              delay: Math.min(delay + index * 60, 160),
              easing: "cubic-bezier(.16, 1, .3, 1)",
              fill: "backwards",
            },
          );
          animations.set(entry.target, animation);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const preference = () => {
      if (reduced.matches) stop();
    };
    // Keyboard navigation never lands on a visually hidden animated control.
    const focus = () => stop();
    targets.forEach((target) => observer.observe(target));
    reduced.addEventListener("change", preference);
    element.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      stop();
      reduced.removeEventListener("change", preference);
      element.removeEventListener("focusin", focus);
    };
  }, [delay, stagger]);
  return (
    <div ref={ref} className={className} data-chapter-reveal>
      {children}
    </div>
  );
}
