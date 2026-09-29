import type { ThreadItem } from "../api";
import { Composer } from "./Composer";
import { Thread } from "./Thread";

export type ChatViewProps = {
  backend?: string;
  messages: ThreadItem[];
  error?: string | null;
  onSend: (text: string) => void;
};

export function ChatView({ backend, messages, error, onSend }: ChatViewProps) {
  return (
    <main>
      <h1>
        kocha-koch {backend && <small>backend: {backend}</small>}
      </h1>
      {error && <div className="error">{error}</div>}
      <Thread messages={messages} />
      <Composer onSend={onSend} />
    </main>
  );
}
