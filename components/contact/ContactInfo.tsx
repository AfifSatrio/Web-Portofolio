import React from "react";
import { Instagram, Phone, Linkedin, Github } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="lg:col-span-5 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase tracking-widest text-mono-500 font-sans font-semibold">
          {"// GET IN TOUCH"}
        </span>
        <h2 className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          LET&apos;S WORK TOGETHER
        </h2>
        <p className="font-sans text-mono-500 text-base leading-relaxed">
          Interested in collaborating, have questions about projects, or just want to say hi? Feel free to send a message through the form or social media channels below.
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-mono-700">
        <a
          href="https://www.instagram.com/afifsatrio_/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
        >
          <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-mono-500 uppercase font-sans">Instagram</span>
            <span className="font-sans text-sm font-semibold">@afifsatrio_</span>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/afifsatrio/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
        >
          <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
            <Linkedin className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-mono-500 uppercase font-sans">LinkedIn</span>
            <span className="font-sans text-sm font-semibold">linkedin.com/in/afifsatrio</span>
          </div>
        </a>

        <a
          href="https://github.com/afifsatrio"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 text-mono-300 hover:text-white transition-colors group"
        >
          <div className="p-3 bg-mono-900 border border-mono-700 rounded-[4px] group-hover:border-white transition-colors">
            <Github className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-mono-500 uppercase font-sans">GitHub</span>
            <span className="font-sans text-sm font-semibold">github.com/afifsatrio</span>
          </div>
        </a>
      </div>
    </div>
  );
};
