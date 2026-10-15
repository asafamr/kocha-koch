import { useId } from "react";
import { Message } from "../components/Message";
import { Progress } from "../components/Progress";

const READING = "קוחה קוראת את קורות החיים ותחזור עם גרסה ראשונה…";
const TIP =
  "טיפ: כדאי ליצור גרסה נפרדת של קורות החיים לכל משרה שאתם מגישים אליה. מערכות סינון אוטומטיות ומגייסים מחפשים את המילים והכישורים שמופיעים בתיאור המשרה, וגרסה מותאמת מציגה קודם את הניסיון הכי רלוונטי לתפקיד. כך קל יותר לראות שאתם מתאימים.";

// What the stages show until kocha's first draft arrives (about a minute): a bar, and a tip to read meanwhile.
export function Reading() {
  const id = useId();
  return (
    <div className="reading">
      <p id={id} className="ds-prep-empty">{READING}</p>
      <Progress labelledBy={id} />
      <Message from="kocha">{TIP}</Message>
    </div>
  );
}
