// Shared identity, SEO, navigation, and contact details.
export const site = {
  name: "Afif Satrio",
  brand: "afif satrio",
  email: "afifsatria2108@gmail.com",
  title: "Afif Satrio | Full Stack Web Developer",
  description:
    "Business websites and custom web applications by Afif Satrio. Full stack web development with Next.js, Laravel, and Tailwind CSS.",
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Portfolio", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ],
  socialLinks: [
    { label: "GitHub", url: "https://github.com/afifsatrio", handle: "@afifsatrio", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/afifsatrio/", handle: "@afifsatrio", icon: "linkedin" },
    { label: "Instagram", url: "https://instagram.com/afifsatrio_", handle: "@afifsatrio_", icon: "instagram" },
  ],
} as const;

export const contactHref = `mailto:${site.email}`;
