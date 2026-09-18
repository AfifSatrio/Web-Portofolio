"use client";
import { useEffect, useRef, ReactNode } from "react";
export type AnimationVariant =
  "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
interface Props {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 400,
  className = "",
  threshold = 0.12,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) || !element.animate)
      return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const transforms = {
      "fade-up": "translateY(12px)",
      "fade-down": "translateY(-12px)",
      "fade-left": "translateX(12px)",
      "fade-right": "translateX(-12px)",
      "zoom-in": "scale(0.98)",
      fade: "none",
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced.matches && !element.contains(document.activeElement)) {
            animation?.cancel();
            animation = element.animate(
              [
                { opacity: 0, transform: transforms[variant] },
                { opacity: 1, transform: "none" },
              ],
              { duration, delay, easing: "ease-out", fill: "backwards" },
            );
          }
          if (once) observer.unobserve(element);
        }
      },
      { threshold },
    );
    const onPreference = () => {
      if (reduced.matches) animation?.cancel();
    };
    const onFocus = () => animation?.cancel();
    element.addEventListener("focusin", onFocus);
    reduced.addEventListener("change", onPreference);
    observer.observe(element);
    return () => {
      element.removeEventListener("focusin", onFocus);
      observer.disconnect();
      animation?.cancel();
      reduced.removeEventListener("change", onPreference);
    };
  }, [variant, delay, duration, threshold, once]);
  // Content is visible before hydration and when JavaScript is unavailable.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
