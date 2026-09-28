export interface Project {
  /** Keep existing IDs unchanged so shared project URLs keep working. */
  id: string;
  title: string;
  description: string;
  techStack: string[];
  websiteUrl?: string;
  sourceUrl?: string;
}

// Edit project content here. Move an object up/down to change its display order.
export const projects: Project[] = [
  {
    id: "d0b8ae6d-c6f6-46fd-a13e-335f63d7df27",
    title: "Elementary School Information  System (SIPANDA)",
    description: "SIPANDA (Sistem Informasi Pendidikan Anak SD) is the official website of SD Negeri Kedundung 2, a public elementary school located in Kedundung, Magersari District, Mojokerto City, East Java, Indonesia. The platform serves as an integrated digital system for managing student data, attendance, and grades, currently covering 175 students from Grade 1 to Grade 6. Beyond academic administration, the site highlights the school's character-building program through the \"7 Habits of Great Indonesian Children\" movement (Gerakan 7 KAIH), along with extracurricular activities in sports, arts, and religious education such as volleyball, futsal, karate, dance, and Quran reading (BTQ). The website also showcases student achievements, school news and announcements, the school's vision and mission, and provides a public consultation and complaint channel for parents and the community.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "Prisma ORM",
      "Supabase",
      "Firebase Auth",
      "Github",
      "Vercel",
      "Hostinger"
    ],
    websiteUrl: "https://sdn02kedundung.sch.id"
  },
  {
    id: "090f2b5a-6894-4bf4-b405-8dab4a459fce",
    title: "Lalunaspace Company Profile Website",
    description: "La Luna Space is the website for a café, coworking space, VIP room, and event hall located in Sigura-Gura, Malang, Indonesia, operating under the tagline \"#YourProductiveSpace.\" Established in 2022, the venue is open daily from 9 AM to 10 PM and offers over 100 menu items spanning coffee, food, and desserts. The site highlights three main facilities: a casual café area for daily work and coffee, a private VIP Room for exclusive meetings and small gatherings, and a Hall Room that accommodates up to 200 people for seminars, workshops, corporate gatherings, product launches, birthdays, and community events. Visitors can order online through GrabFood or ShopeeFood, or make reservations for the VIP Room and Hall via WhatsApp. The website also features a gallery (\"Teman Laluna\") showcasing past events and moments held at the space.",
    techStack: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "Prisma ORM",
      "Firebase Auth",
      "Github",
      "Vercel",
      "Hostinger"
    ],
    websiteUrl: "https://www.lalunaspace.id"
  },
  {
    id: "16521aa0-cce9-47a4-88c8-8f97506e8e20",
    title: "Ratih Creative Company Profile Website",
    description: "Ratih Creative Media is the website for a digital creative agency based in Madiun, East Java, Indonesia. The site showcases the agency's services in photography, videography, and corporate branding — including logo design and professional brand guidelines — as well as short film production with cinematic, story-driven visuals. With over 4 years in business, a team of 7 crew members, and coverage across 3 cities, the site features sections for About, Portfolio, Blog, and Contact, positioning Ratih as a creative partner for brands looking to strengthen their visual identity.",
    techStack: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "Prisma ORM",
      "Firebase Auth",
      "Github",
      "Vercel"
    ],
    websiteUrl: "https://ratih-murex.vercel.app"
  },
  {
    id: "00000000-0000-4000-8000-000000000205",
    title: "Alira Interior Website",
    description: "Pengembangan website company profile untuk Alira Interior.",
    techStack: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "Prisma ORM",
      "Firebase Auth",
      "Github",
      "Vercel",
      "Hostinger"
    ],
    websiteUrl: "https://www.alirainterior.com/"
  }
];
