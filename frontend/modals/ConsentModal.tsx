import { useState } from "react";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";

export function ConsentModal({ onContinue }: { onContinue: (agreed: boolean) => void }) {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="ds-modal">
      <Block role="dialog" aria-modal="true" aria-label="הסכמה לשמירת מידע">
        <div style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
          <Checkbox
            label="זה בסדר לשמור את המידע שלי ולפנות אליי עם הצעות מקוֹחָה"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            autoFocus
          />
          <Button onClick={() => onContinue(agreed)} style={{ justifySelf: "center" }}>
            המשך
          </Button>
        </div>
      </Block>
    </div>
  );
}
