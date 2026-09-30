import { Button } from "../components/Button";
import { Message } from "../components/Message";

// Last stage: kocha thanks the user, export to PDF, then the call to action for camera practice.
export function ExportPanel({ onExport, onBookPractice }: { onExport: () => void; onBookPractice: () => void }) {
  return (
    <div className="export-panel">
      <Message from="kocha">
        תודה שבניתם איתי את קורות החיים! הם מוכנים. אפשר לייצא אותם עכשיו ל־PDF ולהתחיל לשלוח. בהצלחה!
      </Message>
      <Button onClick={onExport}>ייצוא PDF</Button>
      <Message from="kocha">רוצים להגיע מוכנים לראיון? אפשר להתאמן איתי מול מצלמה.</Message>
      <Button variant="secondary" onClick={onBookPractice}>
        הזמן מקום לאימון מול מצלמה
      </Button>
    </div>
  );
}
