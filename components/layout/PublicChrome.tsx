"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgressWidget } from "@/components/ui/ScrollProgressWidget";
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const home = usePathname() === "/";
  return (
    <div
      className={`stargazer professional-site min-h-screen flex flex-col font-sans relative ${home ? "professional-home" : "professional-inner"}`}
    >
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0 rounded-control bg-white text-black px-5 py-3 font-semibold"
      >
        Skip to content
      </a>
      {!home && <Navbar />}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      {!home && (
        <>
          <ScrollProgressWidget />
          <Footer />
        </>
      )}
    </div>
  );
}
