import { useCallback, useEffect, useState, type FormEvent } from "react";
import { httpApi, type Api, type Snapshot } from "./api";
import { Block } from "./components/Block";
import { Button } from "./components/Button";
import { Paragraph } from "./components/Paragraph";
import { Text } from "./components/Text";

// Polls instead of pushing: file watching is unreliable across container volume mounts.
export function App({ api = httpApi, pollMs = 2000 }: { api?: Api; pollMs?: number }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  const refresh = useCallback(async () => {
    try {
      setSnapshot(await api.load());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [api]);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, pollMs);
    return () => clearInterval(timer);
  }, [refresh, pollMs]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    try {
      await api.send(trimmed);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    refresh();
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16, display: "grid", gap: 12 }}>
      <Text variant="heading">kocha-koch</Text>
      {snapshot && <Text variant="caption">backend: {snapshot.backend}</Text>}
      <div role="alert">{error && <Paragraph>{error}</Paragraph>}</div>
      {/* aria-live: screen readers announce replies as they arrive */}
      <div aria-live="polite" style={{ display: "grid", gap: 12 }}>
        {snapshot?.messages.map((m) => (
          <Block key={m.id}>
            <Paragraph>{m.text}</Paragraph>
            <Paragraph muted>{m.reply ? m.reply.text : "waiting for reply…"}</Paragraph>
          </Block>
        ))}
      </div>
      <form onSubmit={send} style={{ display: "flex", gap: 8 }}>
        <textarea aria-label="Message" rows={3} style={{ flex: 1, font: "inherit" }} value={text} onChange={(e) => setText(e.target.value)} />
        <Button disabled={!text.trim()}>Send</Button>
      </form>
    </main>
  );
}
