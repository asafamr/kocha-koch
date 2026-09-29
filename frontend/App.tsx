import { useCallback, useEffect, useState } from "react";
import { httpApi, type Api, type Snapshot } from "./api";
import { ChatView } from "./components/ChatView";

// Polls instead of pushing: file watching is unreliable across container volume mounts.
export function App({ api = httpApi, pollMs = 2000 }: { api?: Api; pollMs?: number }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  async function send(text: string) {
    try {
      await api.send(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    refresh();
  }

  return (
    <ChatView
      backend={snapshot?.backend}
      messages={snapshot?.messages ?? []}
      error={error}
      onSend={send}
    />
  );
}
