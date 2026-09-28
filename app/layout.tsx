import { site } from "@/content/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import type { Metadata } from "next";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/home.css";
import "@/styles/projects.css";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
