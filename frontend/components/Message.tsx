import type { ReactNode } from "react";
import kochaFace from "./assets/kocha-face.webp";

// One chat message. kocha: avatar + light bubble at the start side; user: ink bubble at the end side.
export function Message({ from, children }: { from: "kocha" | "user"; children: ReactNode }) {
  return (
    <div className={`ds-msg ds-msg-${from}`}>
      {from === "kocha" && <KochaAvatar />}
      <div className="ds-msg-bubble">
        <span className="ds-sr-only">{from === "kocha" ? "קוחה:" : "אני:"}</span>
        {children}
      </div>
    </div>
  );
}

export function KochaAvatar() {
  return <img className="ds-avatar" src={kochaFace} alt="" width={36} height={36} />;
}
