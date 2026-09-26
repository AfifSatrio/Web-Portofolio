"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const revealed = useRef(false);
  useEffect(() => {
    if (!inView || revealed.current || reduced) return;
    revealed.current = true;
    if (scope.current?.contains(document.activeElement)) return;
    const animation = animate(
      scope.current,
      { opacity: [0, 1], y: [20, 0] },
      {
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      },
    );
    const finish = () => animation.complete();
    const element = scope.current;
    element.addEventListener("focusin", finish);
    return () => {
      animation.complete();
      element.removeEventListener("focusin", finish);
    };
  }, [inView, reduced, delay, animate, scope]);
  // Keep server-rendered content readable before hydration and without JavaScript.
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
