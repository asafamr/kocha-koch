import { useState, type FormEvent, type KeyboardEvent } from "react";

// Enter sends, Shift+Enter adds a new line.
export function Composer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) submit(e);
  }

  return (
    <form onSubmit={submit}>
      <textarea
        rows={3}
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button disabled={!text.trim()}>Send</button>
    </form>
  );
}
