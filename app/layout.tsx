import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import "./stargazer.css";
import "./portfolio.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Afif Satrio | Full Stack Web Developer",
    template: "%s | Afif Satrio",
  },
  description:
    "Business websites and custom web applications by Afif Satrio. Full stack web development with Next.js, Laravel, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} scroll-smooth`}>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
