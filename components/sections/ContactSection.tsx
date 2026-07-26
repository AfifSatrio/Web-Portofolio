"use client";

import React from "react";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};
