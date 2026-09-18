import type { AboutContent, Skill } from "@/types";

export const CONTACT_EMAIL = "afifsatria2108@gmail.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

// Profile copy supplied by Afif from his Upwork profile. Structured sections live here;
// the introduction and skill records remain editable through the existing admin.
export const UPWORK_URL =
  "https://www.upwork.com/freelancers/~01cedcacc38e8c6d49";
export const SKILL_CATEGORIES = [
  "Development",
  "Frontend",
  "Backend",
  "Design",
  "Tools",
];
export const PROFILE_ABOUT: AboutContent = {
  id: "00000000-0000-4000-8000-000000000001",
  tagline: "Full Stack Web Developer | Next.js, Laravel & Tailwind CSS",
  bio: "I help businesses build websites tailored to their needs, from company profiles to custom web applications. Using Next.js and Laravel, I work on both responsive user interfaces and back-end functionality.\n\nI have over one year of experience developing websites and web-based information systems based on client requirements. My experience includes working as a Web Developer at Ratih Creative Media and a Frontend Web Developer Intern at cmlabs.",
  cv_url: "",
  updated_at: "2026-09-14T00:00:00.000Z",
};

const LEGACY_BIO =
  "A fullstack developer with hands-on experience in web development, covering both frontend and backend, and skilled in designing intuitive, user-friendly UI/UX using Figma.\n\nComfortable working independently or as part of a team, adaptive to new technologies, and focused on delivering quality work. Beyond that, this developer has a strong interest in photography, mountains and hiking, as well as the esports world. Currently, they're honing their skills at Ratih Creative Media, an agency focused on digital branding and multimedia development.";
const clean = (value: string) =>
  value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .join("\n\n");

export function normalizeAbout(
  about: Partial<AboutContent> | null | undefined,
): AboutContent {
  const bio = typeof about?.bio === "string" ? clean(about.bio) : "";
  const tagline =
    typeof about?.tagline === "string" ? about.tagline.trim() : "";
  return {
    ...PROFILE_ABOUT,
    ...about,
    // Upgrade only the exact previous default copy; retain subsequent admin edits.
    bio: !bio || bio === LEGACY_BIO ? PROFILE_ABOUT.bio : bio,
    tagline:
      !tagline || tagline === "Fullstack Web Developer | UI/UX Designer"
        ? PROFILE_ABOUT.tagline
        : tagline,
    cv_url: typeof about?.cv_url === "string" ? about.cv_url.trim() : "",
  };
}

// Keep seeded IDs stable so existing admin delete/edit operations still address
// the original records. Only untouched legacy records receive this copy upgrade.
const skillRevisions = [
  ["Next.js", "Frontend", "Next.js", "Frontend"],
  ["Tailwind CSS", "Frontend", "Tailwind CSS", "Frontend"],
  ["HTML5 / CSS3", "Frontend", "Responsive Design", "Frontend"],
  [
    "JavaScript / React",
    "Frontend",
    "Front-End Development Framework",
    "Frontend",
  ],
  ["Laravel", "Backend", "Laravel", "Backend"],
  ["PHP", "Backend", "Back-End Development", "Backend"],
  ["phpMyAdmin / MySQL", "Backend", "MySQL", "Backend"],
  ["RESTful API", "Backend", "Content Management System", "Development"],
  ["Figma (UI/UX Design)", "Tools", "Figma", "Design"],
  ["Git / GitHub", "Tools", "GitHub", "Tools"],
  ["OBS Studio", "Tools", "Vercel", "Tools"],
  ["Kerja Tim", "Soft Skills", "Web Development", "Development"],
  ["Kepemimpinan", "Soft Skills", "Full-Stack Development", "Development"],
  ["Manajemen Waktu", "Soft Skills", "Hosting Setup", "Tools"],
  ["Komunikasi", "Soft Skills", "UI/UX Prototyping", "Design"],
];
export const PROFILE_SKILLS: Skill[] = skillRevisions.map(
  ([, , name, category], index) => ({
    id: `00000000-0000-4000-8000-000000000${101 + index}`,
    name,
    category,
    created_at: PROFILE_ABOUT.updated_at,
  }),
);
export function normalizeSkills(skills: Skill[]): Skill[] {
  return skills.map((skill) => {
    const index = PROFILE_SKILLS.findIndex((item) => item.id === skill.id);
    if (index < 0) return skill;
    const [oldName, oldCategory] = skillRevisions[index];
    return skill.name === oldName && skill.category === oldCategory
      ? {
          ...skill,
          name: PROFILE_SKILLS[index].name,
          category: PROFILE_SKILLS[index].category,
        }
      : skill;
  });
}

export const SERVICES = [
  {
    title: "Business websites",
    description:
      "Company profiles and business websites built around your content, services, and goals.",
    detail: "Company profiles · Business websites",
  },
  {
    title: "Custom web applications",
    description:
      "Full-stack applications using Next.js or Laravel, tailored to your requirements and business workflows.",
    detail: "Web applications · Information systems",
  },
  {
    title: "Responsive interfaces",
    description:
      "Interfaces using Tailwind CSS that adapt across screen sizes, with UI/UX prototyping in Figma.",
    detail: "Responsive design · UI/UX prototyping",
  },
  {
    title: "Back-end development",
    description:
      "Back-end functionality to support your website’s features, content, and day-to-day workflows.",
    detail: "Back-end features · Content management",
  },
];
