import { site } from "@/content/site";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer content-container">
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#main-content">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
