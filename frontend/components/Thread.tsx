import type { ThreadItem } from "../api";
import { MessageBubble } from "./MessageBubble";

export function Thread({ messages }: { messages: ThreadItem[] }) {
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <MessageBubble role="user" text={m.text} />
          {m.reply ? (
            <MessageBubble role="ai" text={m.reply.text} by={m.reply.by} />
          ) : (
            <MessageBubble role="ai" text="waiting for reply…" pending />
          )}
        </div>
      ))}
    </div>
  );
}
