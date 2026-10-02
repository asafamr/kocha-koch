import type { PrepPoint, PrepStrength } from "./PrepPoints";

// Sample output of the prep-points prompt per seniority and track, until the AI is wired in.
// Management has no junior level.
export type Seniority = "junior" | "mid" | "senior";
export type Track = "hands-on" | "management";
export type PrepSample = { strengths: PrepStrength[]; points: PrepPoint[] };

export const PREP_SAMPLES: Record<string, PrepSample> = {
  "junior/hands-on": {
    strengths: [{ text: "תואר במדעי המחשב: כדאי לציין את פרויקט הגמר ומה בניתם בו." }],
    points: [
      {
        id: "no-tech-experience-yet",
        question: "מה כבר בניתם בפועל?",
        prepare: "קורות החיים עדיין לא מציגים ניסיון בתעשייה. בחרו פרויקט אחד, הוסיפו קישור, והכינו שני משפטים על החלק שלכם בו.",
        basis: "practice",
      },
      {
        id: "course-without-project",
        question: "מה עשיתם עם מה שלמדתם בקורס?",
        prepare: "הקורס מופיע בלי תוצר. ציינו דבר אחד שבניתם אחריו, גם אם קטן.",
        basis: "practice",
      },
      {
        id: "gap",
        question: "מה עשיתם בשמונת החודשים מאז סיום הלימודים?",
        prepare: "משפט אחד על מה שלמדתם או בניתם בתקופה הזו עונה על השאלה.",
        basis: "research",
      },
    ],
  },
  "mid/hands-on": {
    strengths: [{ text: "ניסיון ב־React ו־Node.js בשתי חברות: כדאי להציג אותו ראשון." }],
    points: [
      {
        id: "short-stays",
        question: "למה שלושה מקומות עבודה בארבע שנים?",
        prepare: "הכינו שורה אחת לכל מעבר: מה חיפשתם ומה קיבלתם. כך המעברים נשמעים כמו כיוון ולא כמו מקרה.",
        basis: "research",
      },
      {
        id: "scope-unclear",
        question: "מה היה באחריות שלכם מקצה לקצה?",
        prepare: "חלק מהשורות מתארות מה הצוות עשה. בחרו פיצ'ר אחד שהובלתם וספרו מה החלטתם ומה יצא.",
        basis: "practice",
      },
      {
        id: "field-change",
        question: "מה עובר איתכם מ־QA לפיתוח?",
        prepare: "ציינו שני דברים שהבאתם מהתפקיד הקודם, למשל אוטומציה והיכרות עם תהליכי שחרור.",
        basis: "practice",
      },
    ],
  },
  "senior/hands-on": {
    strengths: [
      { text: "ממר״ם: אפשר לתאר כתשתיות ותפעול מערכות גדולות, במונחים אזרחיים." },
      { text: "תואר במדעי המחשב מאוניברסיטת תל אביב ושבע שנות ניסיון: מספיק שורה אחת לכל אחד." },
    ],
    points: [
      {
        id: "scope-unclear",
        question: "מה היקף המערכות שעבדתם עליהן?",
        prepare: "יש מספרים טובים בשורות. הכינו עוד נתון אחד על היקף: משתמשים, תעבורה או גודל הצוות.",
        basis: "practice",
      },
      {
        id: "depth-vs-breadth",
        question: "במה אתם הכתובת בצוות?",
        prepare: "בחרו תחום אחד, למשל ביצועים בצד הלקוח, ודוגמה אחת שבה פנו אליכם בגללו.",
        basis: "practice",
      },
      {
        id: "why-now",
        question: "מה אתם מחפשים בתפקיד הבא?",
        prepare: "אחרי ארבע שנים באותו מקום שואלים על זה. משפט אחד על מה שמושך אתכם בתפקיד הזה מספיק.",
        basis: "practice",
      },
    ],
  },
  "mid/management": {
    strengths: [{ text: "הובלת צוות של שלושה מפתחים: כדאי לכתוב כמה אנשים, ממתי ומה הצוות השיג." }],
    points: [
      {
        id: "first-management",
        question: "מה היקף הניהול שלכם היום?",
        prepare: "ציינו כמה אנשים, ממתי, ותוצאה אחת של הצוות. אם זו הובלה מקצועית בלי ניהול ישיר, אמרו את זה בפשטות.",
        basis: "practice",
      },
      {
        id: "hands-on-distance",
        question: "כמה אתם עדיין כותבים קוד?",
        prepare: "הכינו חלוקה גסה, למשל חצי קוד וחצי הובלה, ודוגמה אחת מהחודש האחרון.",
        basis: "practice",
      },
    ],
  },
  "senior/management": {
    strengths: [{ text: "ניהול קבוצה של שני צוותים: כדאי להוסיף כמה אנשים גייסתם ומה היה תחום האחריות." }],
    points: [
      {
        id: "team-scope",
        question: "מה גודל הקבוצה ותחום האחריות?",
        prepare: "הוסיפו מספר אנשים, תחום מוצר ותקציב אם יש. אלה הנתונים הראשונים ששואלים עליהם.",
        basis: "practice",
      },
      {
        id: "outcome-ownership",
        question: "איזו תוצאה עסקית הייתה שלכם?",
        prepare: "בחרו תוצאה אחת עם מספר, והסבירו איזו החלטה שלכם הובילה אליה.",
        basis: "practice",
      },
      {
        id: "hands-on-distance",
        question: "כמה אתם קרובים היום לטכנולוגיה?",
        prepare: "דוגמה אחת להחלטה טכנית שהייתם שותפים לה לאחרונה עונה על השאלה.",
        basis: "practice",
      },
      {
        id: "role-below-last",
        question: "למה תפקיד בלי ניהול ישיר עכשיו?",
        prepare: "התפקיד המבוקש מתחת לתואר האחרון. הכינו משפט אחד על מה שמושך אתכם בו.",
        basis: "practice",
      },
    ],
  },
};
