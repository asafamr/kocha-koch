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
  name: "נועה לוי",
  title: "מפתחת Full Stack בכירה",
  contact: { phone: "050-321-4450", email: "noa.levi@example.com", city: "תל אביב", linkedin: "linkedin.com/in/noalevi" },
  summary:
    "מפתחת Full Stack עם 7 שנות ניסיון בבניית מוצרי SaaS בקנה מידה גדול. מובילה צוותים קטנים, כותבת קוד נקי ומודדת כל שינוי.",
  experience: [
    {
      role: "מפתחת Full Stack בכירה",
      company: "Monday.com",
      location: "תל אביב",
      dates: "2021 – היום",
      bullets: [
        "הובלתי את המעבר של מערכת ההזמנות ל־React ו־TypeScript וקיצרתי את זמן הטעינה ב־40%.",
        "בניתי שירות התראות ב־Node.js שמטפל ב־2 מיליון אירועים ביום.",
        "חנכתי 3 מפתחים ג'וניורים; שניים קודמו בתוך שנה.",
      ],
    },
    {
      role: "מפתחת Frontend",
      company: "Wix",
      location: "תל אביב",
      dates: "2018–2021",
      bullets: [
        "פיתחתי את עורך הטפסים שמשמש 5 מיליון אתרים.",
        "הורדתי את גודל ה־bundle ב־35% בעזרת code splitting ו־lazy loading.",
      ],
    },
  ],
  education: [{ degree: "תואר ראשון במדעי המחשב", school: "אוניברסיטת תל אביב", dates: "2014–2018" }],
  military: { role: "מפתחת תוכנה, סמ״ר", unit: "ממר״ם", dates: "2011–2013" },
  skills: [
    { label: "שפות תכנות", items: "TypeScript, JavaScript, Python, SQL" },
    { label: "טכנולוגיות", items: "React, Node.js, PostgreSQL, AWS, Docker" },
    { label: "שפות", items: "עברית (שפת אם), אנגלית (שוטפת)" },
  ],
};
