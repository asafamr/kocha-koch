import type { PrepEvidence, PrepPoint, PrepStrength } from "./PrepPoints";

// Sample output of the prep-points prompt per seniority and track, until the AI is wired in.
// Management has no junior level.
export type Seniority = "junior" | "mid" | "senior";
export type Track = "hands-on" | "management";
export type PrepSample = { strengths: PrepStrength[]; points: PrepPoint[] };

export const SENIORITY_LABELS: Record<Seniority, string> = { junior: "ג'וניור", mid: "מיד", senior: "בכיר" };
export const TRACK_LABELS: Record<Track, string> = { "hands-on": "מקצועי", management: "ניהולי" };

// Sources cited in docs/cv-weak-points-research.md and docs/cv-knowledge-base.md.
const GAP_STUDIES: PrepEvidence[] = [
  { label: "ניסוי שדה על משך אבטלה וזימון לראיון · Kroft, Lange & Notowidigdo (2013)", url: "https://www.nber.org/papers/w18387" },
  { label: "ניסוי שדה על פערי תעסוקה בקורות חיים · Eriksson & Rooth (2014)", url: "https://www.aeaweb.org/articles?id=10.1257/aer.104.3.1014" },
];
const JOB_HOPPING_STUDY: PrepEvidence[] = [
  { label: "החלפות עבודה תכופות וזימון לראיון, לא בהייטק · Cohn, Maréchal, Schneider & Weber (2021)", url: "https://www.ifo.de/DocDL/cesifo1_wp7976.pdf" },
];
// Accomplishment statements and numbers raise CV ratings (knowledge base tip A1).
const SCOPE_STUDIES: PrepEvidence[] = [
  { label: "מאפייני קורות חיים שמנבאים זימון לראיון · Thoms, McMasters, Roberts & Dombkowski (1999)", url: "https://link.springer.com/article/10.1023/A:1022974232557" },
  { label: "סקירת המחקר על קורות חיים · Risavy (2017)", url: "https://ccsenet.org/journal/index.php/jedp/article/download/66404/35947" },
];
const JUNIOR_ENTRY: PrepEvidence[] = [
  { label: "הון אנושי בהייטק הישראלי 2021-2022 · רשות החדשנות ו־SNPI (2022)", url: "https://innovationisrael.org.il//sites/default/files/דון ההון האנושי 2021-2022.pdf" },
  { label: "פעולות המדינה להגדלת מספר העובדים בהייטק · מבקר המדינה (2021)", url: "https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2021/71B/2021-71b-106-Labor-Market-High-tech.pdf" },
];

export const PREP_SAMPLES: Record<string, PrepSample> = {
  "junior/hands-on": {
    strengths: [{ text: "תואר במדעי המחשב: כדאי לציין את פרויקט הגמר ומה בניתם בו." }],
    points: [
      {
        id: "no-tech-experience-yet",
        question: "מה כבר בניתם בפועל?",
        prepare: "קורות החיים עדיין לא מציגים ניסיון בתעשייה. בחרו פרויקט אחד, הוסיפו קישור, והכינו שני משפטים על החלק שלכם בו.",
        basis: "practice",
        evidence: JUNIOR_ENTRY,
      },
      {
        id: "course-without-project",
        question: "מה עשיתם עם מה שלמדתם בקורס?",
        prepare: "הקורס מופיע בלי תוצר. ציינו דבר אחד שבניתם אחריו, גם אם קטן.",
        basis: "practice",
        evidence: JUNIOR_ENTRY.slice(0, 1),
      },
      {
        id: "gap",
        question: "מה עשיתם בשמונת החודשים מאז סיום הלימודים?",
        prepare: "משפט אחד על מה שלמדתם או בניתם בתקופה הזו עונה על השאלה.",
        basis: "research",
        evidence: GAP_STUDIES,
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
        evidence: JOB_HOPPING_STUDY,
      },
      {
        id: "scope-unclear",
        question: "מה היה באחריות שלכם מקצה לקצה?",
        prepare: "חלק מהשורות מתארות מה הצוות עשה. בחרו פיצ'ר אחד שהובלתם וספרו מה החלטתם ומה יצא.",
        basis: "research",
        evidence: SCOPE_STUDIES,
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
        basis: "research",
        evidence: SCOPE_STUDIES,
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
        basis: "research",
        evidence: SCOPE_STUDIES,
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
