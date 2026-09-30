import type { ButtonHTMLAttributes } from "react";

// primary: marker yellow (default). secondary: ink background, for a second strong action.
export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  return <button className={`ds-button${variant === "secondary" ? " ds-button-secondary" : ""} ${className}`} {...props} />;
}
