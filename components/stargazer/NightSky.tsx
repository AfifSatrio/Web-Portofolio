"use client";

import { useEffect, useRef } from "react";

/** A single sky: interactive in the hero, subdued behind the work. */
export function NightSky() {
  const sky = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = sky.current;
    const landing = element?.parentElement;
    const hero = landing?.querySelector<HTMLElement>(".stargazer-hero");
    if (!element || !landing || !hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let start = 0,
      distance = 1;
    let progress = 0,
      target = 0;
    let x = 0,
      y = 0,
      pointerX = 0,
      pointerY = 0;
    const render = () => {
      frame = 0;
      if (document.hidden) return;
      progress = reduced.matches
        ? target
        : progress + (target - progress) * 0.14;
      const interactive = !reduced.matches && !mobile.matches && target < 1;
      const targetX = interactive ? pointerX : 0;
      const targetY = interactive ? pointerY : 0;
      x = reduced.matches ? 0 : x + (targetX - x) * 0.12;
      y = reduced.matches ? 0 : y + (targetY - y) * 0.12;
      element.style.setProperty("--sky-progress", String(progress));
      element.style.setProperty(
        "--chart-opacity",
        String((0.65 - progress * 0.6) * (mobile.matches ? 0.55 : 1)),
      );
      element.style.setProperty("--sky-x", `${x}px`);
      element.style.setProperty("--sky-y", `${y}px`);
      element.classList.toggle("sky-paused", target >= 1 || reduced.matches);
      if (
        !reduced.matches &&
        (Math.abs(progress - target) > 0.001 ||
          Math.abs(x - targetX) > 0.05 ||
          Math.abs(y - targetY) > 0.05)
      )
        frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(render);
    };
    const scroll = () => {
      target = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      schedule();
    };
    const measure = () => {
      start = hero.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, hero.offsetHeight * 0.8);
      scroll();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || mobile.matches || event.pointerType !== "mouse")
        return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 14;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 10;
      schedule();
    };
    const reset = () => {
      pointerX = 0;
      pointerY = 0;
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else measure();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    measure();
    progress = target;
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", reset);
    mobile.addEventListener("change", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", measure);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", reset);
      mobile.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div ref={sky} className="night-sky" aria-hidden="true">
      <div className="sky-dust" />
      <div className="sky-glow" />
      <div className="star-field">
        {Array.from({ length: 65 }, (_, i) => (
          <i
            key={i}
            className={i % 9 === 0 ? "sky-star sky-star--bright" : "sky-star"}
            style={{
              left: `${(i * 37.73 + 3) % 100}%`,
              top: `${(i * 23.17 + 9) % 100}%`,
              animationDelay: `${-(i % 7)}s`,
              opacity: 0.2 + (i % 5) * 0.13,
            }}
          />
        ))}
      </div>
      <div className="celestial-chart">
        <svg viewBox="0 0 600 600" fill="none">
          <defs>
            <radialGradient id="stargazer-halo">
              <stop stopColor="#92baff" stopOpacity=".13" />
              <stop offset="1" stopColor="#92baff" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="stargazer-line"
              x1="120"
              y1="180"
              x2="430"
              y2="460"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c3d8ff" stopOpacity=".65" />
              <stop offset="1" stopColor="#729acc" stopOpacity=".15" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="290" fill="url(#stargazer-halo)" />
          <g stroke="#b0cbf6" strokeOpacity=".12">
            <circle cx="300" cy="300" r="232" />
            <circle cx="300" cy="300" r="182" strokeDasharray="2 9" />
            <ellipse
              cx="300"
              cy="300"
              rx="232"
              ry="80"
              transform="rotate(-32 300 300)"
            />
            <path d="M300 55V75M300 525V545M55 300H75M525 300H545" />
          </g>
          <path
            className="constellation-line"
            d="M126 333L207 236L291 280L360 155L429 226L389 370L295 425L291 280M389 370L291 280"
            stroke="url(#stargazer-line)"
          />
          {[
            [126, 333],
            [207, 236],
            [291, 280],
            [360, 155],
            [429, 226],
            [389, 370],
            [295, 425],
          ].map(([x, y], i) => (
            <g key={i} className="constellation-node">
              <circle
                cx={x}
                cy={y}
                r={i === 2 ? 16 : 8}
                fill="#b7d3ff"
                opacity=".06"
              />
              <circle cx={x} cy={y} r={i === 2 ? 4 : 2.5} fill="#d3e2ff" />
              <path
                d={`M${x - 9} ${y}h18M${x} ${y - 9}v18`}
                stroke="#d3e2ff"
                strokeOpacity={i === 2 ? ".8" : ".3"}
              />
            </g>
          ))}
          <g
            fill="#a3b2cb"
            fontSize="9"
            letterSpacing="3"
            fontFamily="monospace"
          >
            <text x="289" y="43">
              N
            </text>
            <text x="550" y="304">
              E
            </text>
            <text x="290" y="567">
              S
            </text>
            <text x="35" y="304">
              W
            </text>
          </g>
        </svg>
        <span className="chart-caption">A CURIOUS MIND. AN OPEN SKY.</span>
      </div>
      <div className="sky-horizon" />
    </div>
  );
}
