export type MessageBubbleProps = {
  role: "user" | "ai";
  text: string;
  pending?: boolean;
  by?: string;
};

export function MessageBubble({ role, text, pending, by }: MessageBubbleProps) {
  return (
    <div className={`msg ${role}${pending ? " pending" : ""}`}>
      {by && <span className="by">{by}</span>}
      {text}
    </div>
  );
}
