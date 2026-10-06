import type { PrepEvidence, PrepPoint, PrepStrength } from "./PrepPoints";

// Sample output of the prep-points prompt per seniority and track (with an example target job),
// used by stories and the fake API.
// Management has no junior level.
export type Seniority = "junior" | "mid" | "senior";
export type Track = "hands-on" | "management";
export type PrepSample = { target: string; strengths: PrepStrength[]; jobFit: PrepPoint[]; points: PrepPoint[] };

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
// Job fit: ATS keyword filters match exact words; screening checks basic requirements (tips B1, B9).
const EXACT_TERMS: PrepEvidence[] = [
  { label: "סינון מועמדים לפי מילות מפתח מדויקות · Greenhouse, Talent Filtering", url: "https://support.greenhouse.io/hc/en-us/articles/27104809835291-Talent-Filtering" },
];
const HARD_REQUIREMENTS: PrepEvidence[] = [
  { label: "דחייה אוטומטית לפי תשובות לשאלות סינון · Greenhouse, Auto-reject", url: "https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject" },
  { label: "שלב הסינון לדרישות בסיס · Workday, Recruiting Subprocesses", url: "https://doc.workday.com/workday-education/en-us/course-manuals/recruiting-for-administrators/recruiting-subprocesses.html" },
  { label: "מועמדים שנפסלים בסינון אוטומטי · Fuller et al., Hidden Workers, HBS ו־Accenture (2021)", url: "https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf" },
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

// Junior entry: projects and internships carry weight (knowledge base tip H6).
const JUNIOR_PROJECTS: PrepEvidence[] = [
  { label: "סקר מעסיקים: מה מכריע בגיוס בוגרים · NACE Job Outlook (2024)", url: "https://www.naceweb.org/docs/default-source/default-document-library/2023/publication/research-report/2024-nace-job-outlook.pdf" },
  { label: "מדריך קורות חיים: פרויקטים לסטודנטים · MIT CAPD", url: "https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/" },
];
// Career change: a bridging summary and what carries over (tip H5; research 4.2).
const CAREER_CHANGE: PrepEvidence[] = [
  { label: "מדריך קורות חיים למחליפי קריירה · University of Northwestern-St. Paul", url: "https://www.unwsp.edu/wp-content/uploads/Career-Development/Helpful-Handouts/CD-CareerChanger_Resume-DP-OL.pdf" },
  { label: "תקציר למעבר תחום · Duke Career Hub", url: "https://careerhub.students.duke.edu/summary-statements/" },
  { label: "מחצית מעובדי ההייטק לא למדו מחשבים · סרוגים (2023)", url: "https://www.srugim.co.il/776448-דוח-ההייטק-מחצית-מהעובדים-לא-למדו-מחשב" },
];
// Overqualified and lateral moves: employers worry about commitment (research 4.3).
const COMMITMENT_STUDIES: PrepEvidence[] = [
  { label: "מועמדים חזקים מדי נתפסים כפחות מחויבים · Galperin, Hahl, Sterling & Guo (2020)", url: "https://www.gsb.stanford.edu/faculty-research/publications/too-good-hire-capability-inferences-about-commitment-labor-markets" },
  { label: "מייסדים לשעבר מקבלים פחות זימונים למשרות פיתוח · Botelho & Chang (2023)", url: "https://insights.som.yale.edu/insights/startup-founders-are-at-disadvantage-when-applying-for-jobs" },
];
// Job title as in the ad (tip B3).
const TITLE_MATCH: PrepEvidence[] = [
  { label: "מגייסים מסננים לפי שם תפקיד · Jobscan, State of the Job Search (2025)", url: "https://www.jobscan.co/state-of-the-job-search" },
  { label: "להשתמש בשם התפקיד המדויק · UIC Career Services (2017)", url: "https://careerservices.uic.edu/wp-content/uploads/sites/26/2017/08/Ensure-Your-Resume-Is-Read-ATS.pdf" },
];
// Tailoring: relevant experience raises perceived fit (tip C1).
const TAILORING: PrepEvidence[] = [
  { label: "התאמה נתפסת למשרה ותוכן קורות החיים · Tsai, Chi, Huang & Hsu (2011)", url: "https://api.openalex.org/works/doi:10.1111/j.1464-0597.2010.00434.x" },
];
// Army service in civilian terms (tip H8).
const SERVICE_IN_CIVILIAN_TERMS: PrepEvidence[] = [
  { label: "איך כותבים קורות חיים כשאין ניסיון מקצועי · משרד הביטחון, אגף השיקום", url: "https://www.hachvana.mod.gov.il/ConsultationAndDirection/Employment/Pages/cv-writing.aspx" },
  { label: "איך לכתוב על שירות צבאי בקו\"ח · Dialog (2014)", url: "https://www.dialog.co.il/new-world/work-search/blogs/work-guide-part-4" },
];

export const PREP_SAMPLES: Record<string, PrepSample> = {
  "junior/hands-on": {
    target: "Junior Backend Developer: Python, SQL, Docker",
    jobFit: [
      {
        id: "jobfit-required-skill-missing",
        question: "המשרה מבקשת Docker. איפה זה מופיע?",
        prepare: "Docker לא מופיע בקורות החיים. אם השתמשתם בו בפרויקט, כתבו את המילה בשורה של הפרויקט. אם לא, הכינו משפט על איך תלמדו אותו.",
        evidence: EXACT_TERMS,
      },
      {
        id: "jobfit-required-skill-hidden",
        question: "SQL ברשימת הדרישות. רואים מהר שיש לכם ניסיון?",
        prepare: "SQL מופיע אצלכם רק ברשימת הכישורים. הוסיפו אותו לשורת הפרויקט שבה השתמשתם בו.",
        evidence: HARD_REQUIREMENTS,
      },
    ],
    strengths: [{ text: "תואר במדעי המחשב: כדאי לציין את פרויקט הגמר ומה בניתם בו.", evidence: JUNIOR_PROJECTS }],
    points: [
      {
        id: "no-tech-experience-yet",
        question: "מה כבר בניתם בפועל?",
        prepare: "קורות החיים עדיין לא מציגים ניסיון בתעשייה. בחרו פרויקט אחד, הוסיפו קישור, והכינו שני משפטים על החלק שלכם בו.",
        evidence: [...JUNIOR_ENTRY, ...JUNIOR_PROJECTS],
      },
      {
        id: "course-without-project",
        question: "מה עשיתם עם מה שלמדתם בקורס?",
        prepare: "הקורס מופיע בלי תוצר. ציינו דבר אחד שבניתם אחריו, גם אם קטן.",
        evidence: [...JUNIOR_ENTRY.slice(0, 1), ...JUNIOR_PROJECTS],
      },
      {
        id: "gap",
        question: "מה עשיתם בשמונת החודשים מאז סיום הלימודים?",
        prepare: "משפט אחד על מה שלמדתם או בניתם בתקופה הזו עונה על השאלה.",
        evidence: GAP_STUDIES,
      },
    ],
  },
  "mid/hands-on": {
    target: "Full Stack Developer: React, Node.js, AWS, 3+ שנים",
    jobFit: [
      {
        id: "jobfit-required-skill-missing",
        question: "המשרה מבקשת AWS. איפה זה מופיע?",
        prepare: "AWS לא מופיע בקורות החיים. אם עבדתם עם שירותי ענן אחרים, ציינו אותם במילים של המשרה רק אם זה נכון, והכינו משפט על ההבדלים.",
        evidence: EXACT_TERMS,
      },
    ],
    strengths: [{ text: "ניסיון ב־React ו־Node.js בשתי חברות: כדאי להציג אותו ראשון.", evidence: TAILORING }],
    points: [
      {
        id: "short-stays",
        question: "למה שלושה מקומות עבודה בארבע שנים?",
        prepare: "הכינו שורה אחת לכל מעבר: מה חיפשתם ומה קיבלתם. כך המעברים נשמעים כמו כיוון ולא כמו מקרה.",
        evidence: JOB_HOPPING_STUDY,
      },
      {
        id: "scope-unclear",
        question: "מה היה באחריות שלכם מקצה לקצה?",
        prepare: "חלק מהשורות מתארות מה הצוות עשה. בחרו פיצ'ר אחד שהובלתם וספרו מה החלטתם ומה יצא.",
        evidence: SCOPE_STUDIES,
      },
      {
        id: "field-change",
        question: "מה עובר איתכם מ־QA לפיתוח?",
        prepare: "ציינו שני דברים שהבאתם מהתפקיד הקודם, למשל אוטומציה והיכרות עם תהליכי שחרור.",
        evidence: CAREER_CHANGE,
      },
    ],
  },
  "senior/hands-on": {
    target: "Senior Frontend Engineer: TypeScript, React, GraphQL, בדיקות אוטומטיות",
    jobFit: [
      {
        id: "jobfit-required-skill-missing",
        question: "המשרה מבקשת GraphQL. איפה זה מופיע?",
        prepare: "GraphQL לא מופיע בקורות החיים. אם עבדתם איתו, כתבו אותו במילה הזו בשורה של הפרויקט. אם לא, הכינו משפט על הניסיון הקרוב ביותר, למשל REST APIs.",
        evidence: EXACT_TERMS,
      },
      {
        id: "jobfit-required-skill-hidden",
        question: "בדיקות אוטומטיות בדרישות. רואים את זה מהר?",
        prepare: "הדרישה מופיעה במשרה אבל לא בשורות שלכם. אם כתבתם בדיקות, למשל ב־Jest או Playwright, הוסיפו את זה לשורת הישג.",
        evidence: HARD_REQUIREMENTS,
      },
      {
        id: "jobfit-term-mismatch",
        question: "במשרה כתוב Frontend Engineer, ובקורות החיים Full Stack Developer.",
        prepare: "אם רוב העבודה שלכם הייתה בצד הלקוח, אפשר לכתוב את זה בשורת הכותרת, למשל Full Stack Developer, frontend focus.",
        evidence: TITLE_MATCH,
      },
    ],
    strengths: [
      { text: "ממר״ם: אפשר לתאר כתשתיות ותפעול מערכות גדולות, במונחים אזרחיים.", evidence: SERVICE_IN_CIVILIAN_TERMS },
      { text: "תואר במדעי המחשב מאוניברסיטת תל אביב ושבע שנות ניסיון: מספיק שורה אחת לכל אחד." },
    ],
    points: [
      {
        id: "scope-unclear",
        question: "מה היקף המערכות שעבדתם עליהן?",
        prepare: "יש מספרים טובים בשורות. הכינו עוד נתון אחד על היקף: משתמשים, תעבורה או גודל הצוות.",
        evidence: SCOPE_STUDIES,
      },
      {
        id: "depth-vs-breadth",
        question: "במה אתם הכתובת בצוות?",
        prepare: "בחרו תחום אחד, למשל ביצועים בצד הלקוח, ודוגמה אחת שבה פנו אליכם בגללו.",
      },
      {
        id: "why-now",
        question: "מה אתם מחפשים בתפקיד הבא?",
        prepare: "אחרי ארבע שנים באותו מקום שואלים על זה. משפט אחד על מה שמושך אתכם בתפקיד הזה מספיק.",
        evidence: COMMITMENT_STUDIES,
      },
    ],
  },
  "mid/management": {
    target: "Team Lead: ניהול צוות, גיוס, React",
    jobFit: [
      {
        id: "jobfit-required-skill-hidden",
        question: "המשרה מבקשת ניסיון בגיוס. רואים את זה?",
        prepare: "אם השתתפתם בראיונות או גייסתם, כתבו כמה אנשים ובאיזה תפקיד. זו דרישה שמסננים לפיה.",
        evidence: HARD_REQUIREMENTS,
      },
    ],
    strengths: [{ text: "הובלת צוות של שלושה מפתחים: כדאי לכתוב כמה אנשים, ממתי ומה הצוות השיג.", evidence: SCOPE_STUDIES }],
    points: [
      {
        id: "first-management",
        question: "מה היקף הניהול שלכם היום?",
        prepare: "ציינו כמה אנשים, ממתי, ותוצאה אחת של הצוות. אם זו הובלה מקצועית בלי ניהול ישיר, אמרו את זה בפשטות.",
        evidence: SCOPE_STUDIES,
      },
      {
        id: "hands-on-distance",
        question: "כמה אתם עדיין כותבים קוד?",
        prepare: "הכינו חלוקה גסה, למשל חצי קוד וחצי הובלה, ודוגמה אחת מהחודש האחרון.",
      },
    ],
  },
  "senior/management": {
    target: "Engineering Manager: ניהול מנהלים, 5+ שנות ניהול, תקציב",
    jobFit: [
      {
        id: "jobfit-years-requirement",
        question: "המשרה מבקשת 5 שנות ניהול. כמה יש לכם?",
        prepare: "כתבו את שנות הניהול במספר רק אם הוא עומד בדרישה או עולה עליה. אם לא, הדגישו את היקף הצוותים במקום.",
        evidence: HARD_REQUIREMENTS,
      },
    ],
    strengths: [{ text: "ניהול קבוצה של שני צוותים: כדאי להוסיף כמה אנשים גייסתם ומה היה תחום האחריות.", evidence: SCOPE_STUDIES }],
    points: [
      {
        id: "team-scope",
        question: "מה גודל הקבוצה ותחום האחריות?",
        prepare: "הוסיפו מספר אנשים, תחום מוצר ותקציב אם יש. אלה הנתונים הראשונים ששואלים עליהם.",
        evidence: SCOPE_STUDIES,
      },
      {
        id: "outcome-ownership",
        question: "איזו תוצאה עסקית הייתה שלכם?",
        prepare: "בחרו תוצאה אחת עם מספר, והסבירו איזו החלטה שלכם הובילה אליה.",
        evidence: SCOPE_STUDIES,
      },
      {
        id: "hands-on-distance",
        question: "כמה אתם קרובים היום לטכנולוגיה?",
        prepare: "דוגמה אחת להחלטה טכנית שהייתם שותפים לה לאחרונה עונה על השאלה.",
      },
      {
        id: "role-below-last",
        question: "למה תפקיד בלי ניהול ישיר עכשיו?",
        prepare: "התפקיד המבוקש מתחת לתואר האחרון. הכינו משפט אחד על מה שמושך אתכם בו.",
        evidence: COMMITMENT_STUDIES,
      },
    ],
  },
};
