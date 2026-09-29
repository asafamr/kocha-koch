import { KochaAvatar } from "./Message";

// Kocha is writing: avatar and three animated dots. The text is for screen readers only (status).
export function TypingIndicator() {
  return (
    <div className="ds-msg ds-msg-kocha" role="status">
      <KochaAvatar />
      <div className="ds-msg-bubble ds-typing" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="ds-sr-only">קוחה כותבת…</span>
    </div>
  );
}
