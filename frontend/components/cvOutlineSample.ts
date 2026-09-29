import type { OutlineSection } from "./CvOutline";

// Hebrew sample CV outline, for stories and the app page until real CV data is wired in.
export const SAMPLE_OUTLINE: OutlineSection[] = [
  {
    title: "ניסיון תעסוקתי",
    entries: [
      {
        title: "Monday.com — מפתחת Full Stack בכירה",
        bullets: [
          "פיתחתי מחדש את מערכת ההזמנות ב־React ו־TypeScript וקיצרתי את זמן הטעינה ב־40%.",
          "בניתי שירות התראות ב־Node.js שמטפל ב־2 מיליון אירועים ביום.",
          "חנכתי 3 מפתחים ג'וניורים; שניים קודמו בתוך שנה.",
        ],
      },
      {
        title: "Wix — מפתחת Frontend",
        bullets: [
          "פיתחתי את עורך הטפסים שמשמש 5 מיליון אתרים.",
          "הקטנתי את גודל ה־bundle ב־35% בעזרת code splitting.",
        ],
      },
    ],
  },
  {
    title: "השכלה",
    entries: [
      {
        title: "אוניברסיטת תל אביב — תואר ראשון במדעי המחשב",
        bullets: ["ממוצע 92.", "פרויקט גמר: מערכת המלצות לספרייה האוניברסיטאית."],
      },
    ],
  },
  {
    title: "שירות צבאי",
    entries: [
      {
        title: "ממר״ם — מפתחת תוכנה, סמ״ר",
        bullets: ["פיתחתי כלים פנימיים לניהול משמרות ששימשו 400 חיילים."],
      },
    ],
  },
  {
    title: "כישורים",
    entries: [
      { title: "טכנולוגיות", bullets: ["TypeScript, React, Node.js", "PostgreSQL, AWS, Docker"] },
      { title: "שפות", bullets: ["עברית (שפת אם)", "אנגלית (שוטפת)"] },
    ],
  },
];
