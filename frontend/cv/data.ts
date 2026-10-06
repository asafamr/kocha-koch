// CV content shared by every style. Styles only change layout and typography.
// Only the name is required. A missing or empty section is left out of the page, heading and all:
// a CV shows what the candidate has, and nothing is a requirement (no army service, no degree...).
export type CvJob = { role: string; company: string; location?: string; dates: string; bullets: string[] };
// One line of any other section: a project, certificate, paper, volunteer role, language.
export type CvEntry = { head: string; sub?: string; dates?: string; bullets?: string[] };
export type CvData = {
  name: string;
  title?: string;
  contact?: { phone?: string; email?: string; city?: string; linkedin?: string };
  summary?: string;
  experience?: CvJob[];
  // Other sections in the source CV, in its order: Projects, Certifications, Publications,
  // Volunteering, Languages... Rendered right after experience.
  sections?: { title: string; entries: CvEntry[] }[];
  education?: { degree: string; school?: string; dates?: string }[];
  military?: { role: string; unit?: string; dates?: string };
  skills?: { label: string; items: string }[];
  // Section order, e.g. ["education", "sections", "experience"] for a junior (knowledge base H6).
  // Unlisted sections follow in the template's usual order. Two-column templates apply it per column.
  order?: SectionKey[];
};

export type SectionKey = "experience" | "sections" | "education" | "military" | "skills";
export const DEFAULT_ORDER: SectionKey[] = ["experience", "sections", "education", "military", "skills"];

// The CV's section keys in display order (for the outline): its own order, then DEFAULT_ORDER.
export const sectionOrder = (cv: CvData): SectionKey[] =>
  [...(cv.order ?? []), ...DEFAULT_ORDER].filter((k, i, all) => DEFAULT_ORDER.includes(k) && all.indexOf(k) === i);

export const SAMPLE_CV: CvData = {
  name: "Noa Levi",
  title: "Senior Full Stack Developer",
  contact: { phone: "+972-50-000-0000", email: "noa.levi@example.com", city: "Tel Aviv", linkedin: "linkedin.com/in/example" },
  summary:
    "Full stack developer with 7 years of experience building large-scale SaaS products. Leads small teams, writes clean code and measures every change.",
  experience: [
    {
      role: "Senior Full Stack Developer",
      company: "Monday.com",
      location: "Tel Aviv",
      dates: "Mar 2021 – Present",
      bullets: [
        "Led the migration of the booking system to React and TypeScript, cutting load time by 40%.",
        "Built a Node.js notification service that handles 2 million events a day.",
        "Mentored 3 junior developers; two were promoted within a year.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Wix",
      location: "Tel Aviv",
      dates: "Jun 2018 – Feb 2021",
      bullets: [
        "Developed the form editor used by 5 million websites.",
        "Reduced bundle size by 35% with code splitting and lazy loading.",
      ],
    },
  ],
  education: [{ degree: "B.Sc. Computer Science", school: "Tel Aviv University", dates: "2014 – 2018" }],
  military: { role: "Software Developer, Staff Sergeant", unit: "IDF Mamram", dates: "2011 – 2013" },
  skills: [
    { label: "Languages", items: "TypeScript, JavaScript, Python, SQL" },
    { label: "Technologies", items: "React, Node.js, PostgreSQL, AWS, Docker" },
    { label: "Spoken", items: "Hebrew (native), English (fluent)" },
  ],
};

// A junior CV with only some sections: no summary, no military service, no LinkedIn, and a
// Projects section, and education first (knowledge base tip H6). Templates must render it
// without empty headings.
export const SAMPLE_CV_JUNIOR: CvData = {
  name: "Dana Mizrahi",
  title: "Junior Backend Developer",
  contact: { phone: "+972-52-000-0000", email: "dana.mizrahi@example.com", city: "Haifa" },
  order: ["education", "sections", "experience", "skills"],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Elbit Systems",
      location: "Haifa",
      dates: "Jul 2024 – Sep 2024",
      bullets: ["Wrote Python tests for a telemetry parser, raising coverage from 40% to 85%."],
    },
  ],
  sections: [
    {
      title: "Projects",
      entries: [
        {
          head: "Bus Arrival API",
          sub: "github.com/danam/bus-api",
          dates: "2024",
          bullets: ["A FastAPI service over Israel's public GTFS feed; PostgreSQL, Docker, 300 daily users."],
        },
        { head: "Final project: room booking system", sub: "Java, Spring Boot, MySQL", dates: "2023" },
      ],
    },
  ],
  education: [{ degree: "B.Sc. Computer Science", school: "University of Haifa", dates: "2021 – 2024" }],
  skills: [
    { label: "Languages", items: "Python, Java, SQL" },
    { label: "Tools", items: "FastAPI, Spring Boot, PostgreSQL, Docker, Git" },
  ],
};
