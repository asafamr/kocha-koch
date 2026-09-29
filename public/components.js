// Pure render functions, shared by app.js and Storybook stories.

export function bubble(cls, text) {
  const el = document.createElement("div");
  el.className = `msg ${cls}`;
  el.textContent = text;
  return el;
}

// messages: [{ text, reply: { text } | null }] as returned by GET /api/messages
export function thread(messages) {
  const el = document.createElement("div");
  el.append(
    ...messages.flatMap((m) => [
      bubble("user", m.text),
      m.reply ? bubble("ai", m.reply.text) : bubble("ai pending", "waiting for reply…"),
    ]),
  );
  return el;
}
