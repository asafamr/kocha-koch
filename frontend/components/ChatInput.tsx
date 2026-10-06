import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "./Button";

// Message box at the bottom of a chat. Enter sends, Shift+Enter adds a line. While `busy`
// (kocha is still answering) the user can type but not send, so replies arrive in order.
export function ChatInput({
  onSend,
  placeholder = "כתבו הודעה…",
  busy = false,
}: {
  onSend: (text: string) => void;
  placeholder?: string;
  busy?: boolean;
}) {
  const [text, setText] = useState("");
  const ready = text.trim() !== "" && !busy;

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!ready) return;
    onSend(text.trim());
    setText("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form className="ds-chat-input" onSubmit={submit}>
      <textarea
        className="ds-input"
        rows={2}
        aria-label="הודעה לקוחה"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button type="submit" disabled={!ready}>
        שליחה
      </Button>
    </form>
  );
}
