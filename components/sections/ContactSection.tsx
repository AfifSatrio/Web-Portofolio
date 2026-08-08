"use client";

import React from "react";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <ScrollReveal variant="fade-right" delay={100} className="lg:col-span-5">
          <ContactInfo />
        </ScrollReveal>

        <ScrollReveal variant="fade-left" delay={200} className="lg:col-span-7">
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
};
