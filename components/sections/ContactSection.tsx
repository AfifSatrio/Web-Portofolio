import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
export function ContactSection() {
  return (
    <section className="content-container grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
      <ContactInfo />
      <ContactForm />
    </section>
  );
}
