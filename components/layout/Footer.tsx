import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants";
export function Footer() {
  return (
    <footer className="sg-footer">
      <div className="sg-container">
        <div className="footer-top">
          <Link href="/" className="sg-brand">
            afif satrio
            <span className="brand-period">.</span>
          </Link>
          <p>Independent web developer.</p>
          <nav aria-label="Social links">
            {SOCIAL_LINKS.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label === "GITHUB" ? "GitHub" : "LinkedIn"} ↗
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Afif Satrio</span>
          <span>Designed & built by Afif Satrio.</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
