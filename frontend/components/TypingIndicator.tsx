import { KochaAvatar } from "./Message";

// Kocha is writing: avatar and three animated dots. The text is for screen readers only (status).
// `detail` (e.g. "חושבת · 18 שנ׳") and `note` (the model's latest thought heading, any language)
// show progress under the dots so a long answer does not look stuck. They change every few
// seconds, so they are hidden from screen readers rather than announced.
export function TypingIndicator({ detail, note }: { detail?: string; note?: string }) {
  return (
    <div className="ds-msg ds-msg-kocha" role="status">
      <KochaAvatar />
      <div className="ds-msg-bubble" aria-hidden="true">
        <div className="ds-typing">
          <span />
          <span />
          <span />
        </div>
        {detail && <div className="ds-typing-detail">{detail}</div>}
        {note && (
          <div className="ds-typing-note" dir="auto">
            {note}
          </div>
        )}
      </div>
      <span className="ds-sr-only">קוחה כותבת…</span>
    </div>
  );
}
