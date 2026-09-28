"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { contactHref, site } from "@/content/site";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    const element = dialog.current;
    const triggerElement = trigger.current;
    if (!element) return;
    if (!isOpen) {
      if (element.open) element.close();
      return;
    }
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setIsOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", closeOnDesktop);
      if (element.open) element.close();
      triggerElement?.focus();
    };
  }, [isOpen]);
  return (
    <>
      <header className="site-header">
        <div className="content-container site-nav">
          <Link href="/" aria-label={`${site.name} home`} className="site-brand">
            {site.brand}
            <span>®</span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {site.navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={
                  pathname === link.href ||
                  (link.label === "Portfolio" && pathname.startsWith("/projects"))
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a className="nav-contact" href={contactHref}>
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={trigger}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="menu-button"
          >
            <Menu size={23} aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-title"
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        className="mobile-dialog"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not(:disabled)",
          );
          const first = controls[0],
            last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="mobile-menu-top">
          <h2 id="mobile-navigation-title" className="eyebrow">
            Explore
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="menu-close"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {site.navigation.map((link, index) => (
            <Link
              href={link.href}
              key={link.label}
              onClick={() => setIsOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={23} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <a
          href={contactHref}
          onClick={() => setIsOpen(false)}
          className="solid-link"
        >
          Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <p className="mobile-menu-caption">Independent web development.</p>
      </dialog>
    </>
  );
}
