// Sample data for stories.
import type { ThreadItem } from "../api";

export const answered: ThreadItem[] = [
  {
    id: "1",
    ts: "2026-01-01T10:00:00Z",
    text: "hello",
    reply: { id: "1", ts: "2026-01-01T10:00:05Z", text: "Hi. What do you need?", by: "claude-code" },
  },
  {
    id: "2",
    ts: "2026-01-01T10:01:00Z",
    text: "a multi-line\nmessage",
    reply: { id: "2", ts: "2026-01-01T10:01:04Z", text: "line one\nline two", by: "gemini:gemini-2.5-flash" },
  },
];

export const withPending: ThreadItem[] = [
  ...answered,
  { id: "3", ts: "2026-01-01T10:02:00Z", text: "still waiting on this", reply: null },
];
