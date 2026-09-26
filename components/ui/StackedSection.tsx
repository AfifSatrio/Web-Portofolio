"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function StackedSection({
  id,
  labelledBy,
  className,
  index,
  last = false,
  children,
}: {
  id: string;
  labelledBy: string;
  className: string;
  index: number;
  last?: boolean;
  children: ReactNode;
}) {
  const slot = useRef<HTMLElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [geometry, setGeometry] = useState({ top: 0, overlap: 0 });
  // This marker stays in normal flow, so sticky positioning cannot
  // change the scroll measurements that drive the animation.
  const { scrollYProgress } = useScroll({
    target: end,
    offset: ["start end", "start start"],
  });
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.08]);
  const enabled = !reduced && geometry.overlap > 0;

  useEffect(() => {
    const element = surface.current;
    if (!element || reduced) return;
    const measure = () => {
      const header =
        document.querySelector(".site-header")?.getBoundingClientRect().height || 78;
      const inset = header;
      // Tall sections scroll fully before pinning their bottom edge to the viewport.
      const top = Math.min(inset, window.innerHeight - element.offsetHeight);
      const overlap = Math.max(0, window.innerHeight - inset);
      setGeometry((previous) =>
        previous.top === top && previous.overlap === overlap
          ? previous
          : { top, overlap },
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  return (
    <section
      ref={slot}
      id={id}
      aria-labelledby={labelledBy}
      className="section-stack-item"
      data-stacking={enabled ? "true" : undefined}
      style={
        {
          "--stack-top": `${geometry.top}px`,
          "--stack-overlap": enabled && !last ? `${geometry.overlap}px` : "0px",
          zIndex: index + 1,
        } as CSSProperties
      }
      onFocusCapture={(event) => {
        if (!enabled || !event.target.matches(":focus-visible")) return;
        const section = surface.current;
        const wrapper = slot.current;
        if (!section || !wrapper) return;
        // Reveal keyboard-focused controls even when their section is covered.
        const offset =
          event.target.getBoundingClientRect().top -
          section.getBoundingClientRect().top;
        const header =
          document.querySelector(".site-header")?.getBoundingClientRect().height || 78;
        const naturalTop = window.scrollY + wrapper.getBoundingClientRect().top;
        window.scrollTo({
          // Once pinned, scrolling farther moves the next section over this one.
          top: Math.min(
            naturalTop + offset - header - 48,
            naturalTop - geometry.top,
          ),
          behavior: "instant",
        });
      }}
    >
      <div ref={surface} className="section-stack-surface">
        <div className={`content-container ${className}`}>{children}</div>
        {!last && (
          <motion.div
            aria-hidden="true"
            className="section-stack-shade"
            style={{ opacity: enabled ? shade : 0 }}
          />
        )}
      </div>
      <div ref={end} aria-hidden="true" className="section-stack-marker" />
    </section>
  );
}
