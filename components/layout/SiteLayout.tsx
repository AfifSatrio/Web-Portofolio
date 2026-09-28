"use client";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="public-site min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
