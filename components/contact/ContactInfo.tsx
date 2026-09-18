import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_HREF, UPWORK_URL } from "@/lib/profile-content";
export function ContactInfo() {
  return (
    <div>
      <p className="eyebrow mb-4">Let’s talk</p>
      <h1 className="page-title">
        Your next
        <br />
        website starts here.
      </h1>
      <p className="body-copy mt-6 max-w-md">
        Share your website requirements, and we can discuss the features, scope,
        and next steps for your project.
      </p>
      <div className="mt-8 border-t border-line">
        {[
          { name: "Email", detail: CONTACT_EMAIL, href: CONTACT_HREF },
          {
            name: "Upwork",
            detail: "View my freelance profile",
            href: UPWORK_URL,
          },
          {
            name: "LinkedIn",
            detail: "Connect professionally",
            href: "https://www.linkedin.com/in/afifsatrio/",
          },
          {
            name: "GitHub",
            detail: "Explore my code",
            href: "https://github.com/afifsatrio",
          },
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.name === "Email" ? undefined : "_blank"}
            rel="noreferrer"
            className="flex justify-between items-center gap-4 py-5 border-b border-line group"
          >
            <div>
              <span className="font-semibold group-hover:underline underline-offset-4">
                {link.name}
              </span>
              <p className="text-sm text-ink-secondary mt-1">{link.detail}</p>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
