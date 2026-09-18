import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss your business website or custom web application with Afif Satrio. Share your requirements and plan your next steps.",
};
export default function ContactPage() {
  return (
    <div className="page-shell">
      <ContactSection />
    </div>
  );
}
