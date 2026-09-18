"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { CONTACT_HREF } from "@/lib/profile-content";

const links = [
  { name: "Work", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

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
      <header className="sg-header">
        <div className="sg-container sg-nav">
          <Link href="/" aria-label="Afif Satrio home" className="sg-brand">
            afif satrio
            <span className="brand-period">.</span>
          </Link>
          <nav aria-label="Main navigation" className="sg-desktop-nav">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
          <a className="nav-contact" href={CONTACT_HREF}>
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={trigger}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="sg-menu-button"
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
        className="sg-mobile-dialog"
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
          <h2 id="mobile-navigation-title" className="sg-eyebrow">
            Explore
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="sg-menu-close"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={link.name}
              onClick={() => setIsOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.name}
              <ArrowUpRight size={23} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <a
          href={CONTACT_HREF}
          onClick={() => setIsOpen(false)}
          className="sg-button"
        >
          Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <p className="mobile-menu-caption">Independent web development.</p>
      </dialog>
    </>
  );
}
