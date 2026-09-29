// CV content shared by every style. Styles only change layout and typography.
export type CvJob = { role: string; company: string; location: string; dates: string; bullets: string[] };
export type CvData = {
  name: string;
  title: string;
  contact: { phone: string; email: string; city: string; linkedin: string };
  summary: string;
  experience: CvJob[];
  education: { degree: string; school: string; dates: string }[];
  military: { role: string; unit: string; dates: string };
  skills: { label: string; items: string }[];
};

export const SAMPLE_CV: CvData = {
  name: "Noa Levi",
  title: "Senior Full Stack Developer",
  contact: { phone: "+972-50-321-4450", email: "noa.levi@example.com", city: "Tel Aviv", linkedin: "linkedin.com/in/noalevi" },
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
