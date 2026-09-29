import { thread } from "./components.js";

const log = document.getElementById("log");
const form = document.getElementById("form");
const input = document.getElementById("text");

// Poll instead of fs events: file watching is unreliable across container volume mounts.
async function refresh() {
  const res = await fetch("/api/messages");
  const { backend, messages } = await res.json();
  document.getElementById("backend").textContent = `backend: ${backend}`;
  log.replaceChildren(thread(messages));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  await fetch("/api/messages", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  refresh();
});

refresh();
setInterval(refresh, 2000);
