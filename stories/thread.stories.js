import { thread } from "../public/components.js";

export default {
  title: "Thread",
  render: ({ messages }) => thread(messages),
};

export const Empty = { args: { messages: [] } };

export const Answered = {
  args: {
    messages: [
      { text: "hello", reply: { text: "Hi. What do you need?" } },
      { text: "a multi-line\nmessage", reply: { text: "line one\nline two" } },
    ],
  },
};

export const Pending = {
  args: { messages: [{ text: "still waiting on this", reply: null }] },
};
