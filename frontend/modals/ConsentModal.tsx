import { useState } from "react";
import { Block } from "../components/Block";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";

import { CONSENT } from "../../src/consent";

// The consent, with the same versioned text as the intake form (src/consent.ts).
export const CONSENT_LABEL = CONSENT.texts.cv_processing;

export function ConsentModal({
  onContinue,
  defaultAgreed = false,
}: {
  onContinue: (agreed: boolean) => void;
  defaultAgreed?: boolean;
}) {
  const [agreed, setAgreed] = useState(defaultAgreed);
  return (
    <div className="ds-modal">
      <Block role="dialog" aria-modal="true" aria-label="הסכמה לשמירת מידע">
        <div style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
          <Checkbox
            label={CONSENT_LABEL}
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
